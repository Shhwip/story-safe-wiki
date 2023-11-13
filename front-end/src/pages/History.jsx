import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function History() {
    const { title } = useParams();
    const [history, setHistory] = useState(null);

    useEffect(() => {
        const getHistory = async () => {
            await axios
                .get("http://localhost:4000/h/" + title)
                .then((response) => {
                    setHistory(response.data);
                    console.log("success");
                })
                .catch((error) => {
                    console.log("error: ");
                    console.log(error);
                });
        };
        getHistory();
    });

    return (
        <div>
            <Header />
            <div className="history" style={{"top":"50%", "transform": "translateY(50%)"}}>
                <h1>History</h1>
                <div className="history-list">
                    {history ? (
                        history.map((item) => {
                            return (
                                <div className="history-item">
                                    <h3>{item.username}</h3>
                                    <p>{item.timestamp}</p>
                                    <p>{item.outputSize}</p>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}

