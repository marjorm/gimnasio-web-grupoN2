#requires -Version 5.1
param(
 [string]$NombreBase='gimnasio_entregable6_test',
 [string]$MysqlExe='C:\xampp\mysql\bin\mysql.exe',
 [switch]$AutorizarBaseOriginal
)
$ErrorActionPreference='Stop'
if ($NombreBase -cnotmatch '^[A-Za-z_][A-Za-z0-9_]{0,63}$') { throw 'Nombre de base invalido.' }
if ($NombreBase -eq 'gimnasio' -and -not $AutorizarBaseOriginal) { throw 'No se permite alterar la base original sin -AutorizarBaseOriginal.' }
if (-not (Test-Path $MysqlExe)) { throw 'No se encontro mysql.exe.' }
$repo=Split-Path $PSScriptRoot -Parent
$origen=Join-Path $repo 'GIMNASIO.sql'
$migracion=Join-Path $PSScriptRoot 'entregable6_migracion.sql'
if (-not (Test-Path $origen) -or -not (Test-Path $migracion)) { throw 'Faltan scripts SQL.' }
$mysqlArgs=@('--protocol=tcp','--host=127.0.0.1','--port=3306','--user=root','--batch','--skip-column-names')
$exist=@(& $MysqlExe @mysqlArgs -e "SELECT COUNT(*) FROM information_schema.SCHEMATA WHERE SCHEMA_NAME='$NombreBase';")
if ($LASTEXITCODE -ne 0) { throw 'No hay conexion a MariaDB.' }
if ([int]($exist | Select-Object -Last 1) -eq 0) {
    $sql=[IO.File]::ReadAllText($origen)
    $marca=$sql.IndexOf('/*a. Mostrar cedula',[StringComparison]::OrdinalIgnoreCase)
    if ($marca -le 0) { throw 'El SQL original cambio: no se reconoce separador de ejercicios.' }
    $inicio=$sql.Substring(0,$marca)
    if ([regex]::Matches($inicio,'(?im)^\s*create\s+table\s+').Count -ne 7) { throw 'El SQL base no contiene siete tablas.' }
    if ($inicio -match '(?im)^\s*(DROP|TRUNCATE|DELETE)\b') { throw 'SQL base potencialmente destructivo.' }
    & $MysqlExe @mysqlArgs -e "CREATE DATABASE $NombreBase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo crear la base.' }
    $tmp=Join-Path $env:TEMP ('gimnasio-base-'+[guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $tmp | Out-Null
    $archivo=Join-Path $tmp 'original-inicial.sql'
    [IO.File]::WriteAllText($archivo,$inicio,(New-Object Text.UTF8Encoding($false)))
    $log=Join-Path $tmp 'importacion.log';$err=Join-Path $tmp 'errores.log'
    $p=Start-Process -FilePath $MysqlExe -ArgumentList "--protocol=tcp --host=127.0.0.1 --port=3306 --user=root --default-character-set=utf8mb4 --database=$NombreBase" -RedirectStandardInput $archivo -RedirectStandardOutput $log -RedirectStandardError $err -Wait -PassThru
    if ($p.ExitCode -ne 0) { Get-Content $err -Tail 30; throw 'Importacion inicial fallida; revisar antes de reintentar.' }
    Write-Host 'BASE_INICIAL=PASS'
} else { Write-Host 'BASE_EXISTENTE=SI' }
# Migración idempotente, respaldar antes de ejecutarla sobre datos reales.
$tmp=Join-Path $env:TEMP ('gimnasio-migracion-'+[guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tmp | Out-Null
$log=Join-Path $tmp 'migracion.log';$err=Join-Path $tmp 'errores.log'
$p=Start-Process -FilePath $MysqlExe -ArgumentList "--protocol=tcp --host=127.0.0.1 --port=3306 --user=root --default-character-set=utf8mb4 --database=$NombreBase" -RedirectStandardInput $migracion -RedirectStandardOutput $log -RedirectStandardError $err -Wait -PassThru
if ($p.ExitCode -ne 0) { Get-Content $err -Tail 30; throw 'MIGRACION=FAIL' }
$tablas=@(& $MysqlExe @mysqlArgs "--database=$NombreBase" -e 'SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE();')
if ($LASTEXITCODE -ne 0 -or [int]($tablas|Select-Object -Last 1) -lt 12) { throw 'Esquema final incompleto.' }
Write-Host "BASE_FINAL=$NombreBase"
Write-Host "TABLAS=$($tablas|Select-Object -Last 1)"
Write-Host 'MIGRACION_ENTREGABLE6=PASS'
Write-Host "LOGS=$tmp"
