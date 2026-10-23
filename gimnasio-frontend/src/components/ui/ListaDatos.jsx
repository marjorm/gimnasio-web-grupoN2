import React from 'react';

export default function ListaDatos({ items, renderItem }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
                <React.Fragment key={item.id || item.cedula || index}>
                    {renderItem(item)}
                </React.Fragment>
            ))}
        </div>
    );
}