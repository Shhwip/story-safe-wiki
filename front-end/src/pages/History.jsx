import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";


const getEdit = async (title, id) => {
    console.log("getEdit")
    await axios
        .get("http://localhost:4000/h/"+ title + "/" + id)
        .then((response) => {
            console.log("single history success");
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log("error: ");
            console.log(error);
        });
};

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
    }, [title]);

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
                                    <button onClick={() => {getEdit(title, item.previousID);}}>before</button>
                                    <button onClick={() => {getEdit(title, item._id);}}>after</button>
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

