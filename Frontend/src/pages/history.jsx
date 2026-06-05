import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

import { IconButton } from '@mui/material';
export default function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
               
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }
   return (
    <div
        style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            padding: "30px",
            color: "white"
        }}
    >
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px"
            }}
        >
            <h1
                style={{
                    margin: 0,
                    fontSize: "2.5rem",
                    fontWeight: "bold"
                }}
            >
                📜 Meeting History
            </h1>

            <IconButton
                onClick={() => routeTo("/home")}
                sx={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#1d4ed8"
                    }
                }}
            >
                <HomeIcon />
            </IconButton>
        </div>

        {!Array.isArray(meetings) || meetings.length === 0 ? (
            <div
                style={{
                    minHeight: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}
            >
                <div
                    style={{
                        fontSize: "80px",
                        marginBottom: "20px"
                    }}
                >
                    📜
                </div>

                <h2
                    style={{
                        color: "white",
                        fontSize: "2rem",
                        marginBottom: "10px"
                    }}
                >
                    No Meeting History Found
                </h2>

                <p
                    style={{
                        color: "#cbd5e1",
                        fontSize: "1.1rem"
                    }}
                >
                    Join a meeting to see your history here.
                </p>

                <button
                    onClick={() => routeTo("/home")}
                    style={{
                        marginTop: "25px",
                        padding: "12px 25px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#2563eb",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Go To Home
                </button>
            </div>
        ) : (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "25px",
                    padding: "20px"
                }}
            >
                {meetings.map((e, i) => (
                    <Card
                        key={e._id || i}
                        sx={{
                            borderRadius: "18px",
                            background: "#ffffff",
                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.15)",
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-6px)"
                            }
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#2563eb"
                                }}
                            >
                                Meeting #{i + 1}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2,
                                    fontSize: "16px"
                                }}
                            >
                                <strong>Code:</strong>{" "}
                                {e.meetingCode}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    color: "#64748b"
                                }}
                            >
                                <strong>Date:</strong>{" "}
                                {formatDate(e.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
    </div>
);
}