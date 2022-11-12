import './App.css';
import Calculator from "./components/Calculator";

function App() {
    return (
        <main>
            <section>
                <ul className="notes center mt-small">
                    <li>The display box is editable, you can directly type in the expression.</li>
                    <li>Valid expression are shown below the display.</li>
                    <li>'=' button is disabled when expression is invalid.</li>
                </ul>
                <div className="mt-small">
                    <Calculator/>
                </div>
            </section>
        </main>
    );
}

export default App;
