#requires -Version 5.1
<#
.Preparación no destructiva de la base de datos de desarrollo para el proyecto Gimnasio.
- Si la base existe, solo consulta tablas y conteos.
- Si no existe, genera SQL temporal desde GIMNASIO.sql sin la sección de ejercicios Oracle.
- No elimina ni sobrescribe bases o archivos del repositorio.
Requiere MariaDB/MySQL en localhost y usuario root sin contraseña (instalación XAMPP estándar).
#>
param(
    [string]$NombreBase = 'gimnasio',
    [string]$MysqlExe = 'C:\xampp\mysql\bin\mysql.exe',
    [int]$Puerto = 3306,
    [string]$Usuario = 'root'
)
$ErrorActionPreference = 'Stop'

if ($NombreBase -cnotmatch '^[a-zA-Z_][a-zA-Z0-9_]{0,63}$') {
    throw 'Nombre de base de datos no válido.'
}
if ($Puerto -lt 1 -or $Puerto -gt 65535) {
    throw 'Puerto TCP no válido.'
}
if (-not (Test-Path -LiteralPath $MysqlExe -PathType Leaf)) {
    $cmd = Get-Command mysql.exe -ErrorAction SilentlyContinue
    if ($null -eq $cmd) { throw "No se encontró mysql.exe: $MysqlExe" }
    $MysqlExe = $cmd.Source
}
$repo = Split-Path $PSScriptRoot -Parent
$origen = Join-Path $repo 'GIMNASIO.sql'
if (-not (Test-Path -LiteralPath $origen -PathType Leaf)) {
    throw "No se encontró GIMNASIO.sql en la raíz: $origen"
}

$conexion = @('--protocol=tcp', '--host=127.0.0.1', "--port=$Puerto", "--user=$Usuario", '--batch', '--skip-column-names')
Write-Host "BASE_SOLICITADA=$NombreBase"
Write-Host "MYSQL=$MysqlExe"

$resultado = @(& $MysqlExe @conexion -e "SELECT COUNT(*) FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = '$NombreBase';")
if ($LASTEXITCODE -ne 0) { throw 'No se pudo consultar el servidor MariaDB/MySQL.' }
$existentes = [int]($resultado | Select-Object -Last 1)

if ($existentes -eq 0) {
    $contenido = [System.IO.File]::ReadAllText($origen)
    $inicioEjercicios = $contenido.IndexOf('/*a. Mostrar cedula', [System.StringComparison]::OrdinalIgnoreCase)
    if ($inicioEjercicios -le 0) { throw 'No se encontró el delimitador de los ejercicios Oracle; no se importará.' }
    $inicial = $contenido.Substring(0, $inicioEjercicios)
    $tablas = [regex]::Matches($inicial, '(?im)^\s*create\s+table\s+').Count
    $insertados = [regex]::Matches($inicial, '(?im)^\s*insert\s+into\s+').Count
    if ($tablas -ne 7 -or $insertados -lt 90) {
        throw "El SQL original cambió: tablas=$tablas inserciones=$insertados. Revisión manual requerida."
    }
    if ($inicial -match '(?im)^\s*(DROP|TRUNCATE|DELETE|UPDATE|REPLACE)\b') {
        throw 'SQL inicial contiene instrucciones no permitidas.'
    }

    $temp = Join-Path $env:TEMP ('gimnasio-import-' + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $temp | Out-Null
    $sqlTemp = Join-Path $temp 'datos-iniciales.sql'
    $salida = Join-Path $temp 'importacion.log'
    $errores = Join-Path $temp 'errores.log'
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($sqlTemp, $inicial, $utf8)

    Write-Host "CREANDO_BASE=$NombreBase"
    & $MysqlExe @conexion -e "CREATE DATABASE $NombreBase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo crear la base de datos.' }

    Write-Host 'IMPORTANDO_SQL_INICIAL=INICIADO'
    $argsProceso = "--protocol=tcp --host=127.0.0.1 --port=$Puerto --user=$Usuario --default-character-set=utf8mb4 --database=$NombreBase"
    $p = Start-Process -FilePath $MysqlExe -ArgumentList $argsProceso `
         -RedirectStandardInput $sqlTemp -RedirectStandardOutput $salida `
         -RedirectStandardError $errores -Wait -PassThru
    if ($p.ExitCode -ne 0) {
        Write-Host "LOGS_IMPORTACION=$temp"
        Get-Content -LiteralPath $errores -Tail 30
        throw 'La importación falló. No ejecutar otra vez ni borrar la base; revisar el log.'
    }
    Write-Host 'IMPORTACION_SQL=PASS' -ForegroundColor Green
    Write-Host "LOGS_IMPORTACION=$temp"
} else {
    Write-Host 'BASE_EXISTENTE_NO_MODIFICADA=SI' -ForegroundColor Yellow
}

$consulta = 'SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE(); SELECT COUNT(*) FROM cursos; SELECT COUNT(*) FROM usuario;'
$conteos = @(& $MysqlExe @conexion "--database=$NombreBase" -e $consulta)
if ($LASTEXITCODE -ne 0 -or $conteos.Count -ne 3) {
    throw 'No fue posible verificar el esquema y sus datos. Revise su estado; no se modificará automáticamente.'
}
$tablasFinal = [int]$conteos[0]
$cursosFinal = [int]$conteos[1]
$usuariosFinal = [int]$conteos[2]
Write-Host "TABLAS=$tablasFinal"
Write-Host "CURSOS=$cursosFinal"
Write-Host "USUARIOS=$usuariosFinal"
if ($tablasFinal -ne 7 -or $cursosFinal -lt 6 -or $usuariosFinal -lt 26) {
    throw 'Los datos no coinciden con la estructura inicial esperada. Revisar manualmente.'
}
Write-Host 'PREPARACION_MARIADB=PASS' -ForegroundColor Green
