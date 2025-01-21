import React, {useState} from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";

const initialLayout = [
    {i: "1", x: 0, y: 0, w: 1, h: 1, content: "Top Left"},
    {i: "2", x: 2, y: 0, w: 1, h: 1, content: "Top Right"},
    {i: "3", x: 1, y: 1, w: 1, h: 1, content: "Center"},
    {i: "4", x: 0, y: 2, w: 1, h: 1, content: "Bottom Left"},
    {i: "5", x: 2, y: 2, w: 1, h: 1, content: "Bottom Right"},
];

function App() {
    const [layout, setLayout] = useState(initialLayout);

    const handleDragStop = (l, oldItem, newItem) => {
        const targetItemIndex = l.findIndex(
            (item) => item.x === newItem.x && item.y === newItem.y && item.i !== newItem.i
        );

        if (targetItemIndex !== -1) {
            const updatedLayout = [...l];
            updatedLayout[targetItemIndex].x = oldItem.x
            updatedLayout[targetItemIndex].y = oldItem.y
            setLayout(updatedLayout);
        }
    };

    const addItem = () => {
        const newItem = {
            i: `${layout.length + 1}`,
            x: (Math.max(...layout.map(l => l.x)) + 1) % 3,
            y: Math.max(...layout.map(l => l.y)) + 1,
            w: 1,
            h: 1,
            content: `New Item ${layout.length + 1}`,
        };
        setLayout([...layout, newItem]);
    };

    return (
        <div className="app">
            <header>
                <div>PLANNER</div>
                <button className="add-button" onClick={addItem}>Add Item</button>
            </header>
            <main className="grid">
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={3}
                    rowHeight={200}
                    width={600}
                    compactType={null}
                    preventCollision={true}
                    allowOverlap={true}
                    onDragStop={handleDragStop}
                >
                    {layout.map((item) => (
                        <div key={item.i} className="grid-item">
                            {item.content}
                        </div>
                    ))}
                </GridLayout>
            </main>
        </div>
    );
}

export default App;