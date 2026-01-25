import mqtt from "mqtt";
import React, { useEffect, useRef, useState } from "react";

function MqttExample() {
    const clientRef = useRef(null);
    const [message, setMessage] = useState("");
    console.log("an lz");
    useEffect(() => {
        console.log(clientRef.current);
        if (!clientRef.current) {
            const brokerUrl = "wss://f7fda5477fe0413392c1eef030885503.s1.eu.hivemq.cloud:8884/mqtt"; // or your HiveMQ Cloud endpoint
            const options = {
                clientId: "react_client_" + Math.random().toString(16).substr(2, 8),
                username: "thuan", // HiveMQ Cloud username
                password: "Thuan123", // HiveMQ Cloud password
                connectTimeout: 10_000,     // ms
            };

            clientRef.current = mqtt.connect(brokerUrl, options);

            clientRef.current.on("connect", () => {
                console.log("✅ Connected to HiveMQ");

                // Subscribe to a topic
                clientRef.current.subscribe("esp32/in", (err) => {
                    if (!err) console.log("Subscribed to esp32/in");
                });
            });

            clientRef.current.on("message", (topic, message) => {
                console.log("📩 Message received:", topic, message.toString());
            });

            clientRef.current.on("error", (err) => {
                console.error("❌ Connection error:", err);
            });
        }

        return () => {
            clientRef.current.end();
            clientRef.current = null
        }
    }, []);

    const sendMessage = () => {
        clientRef.current.publish("esp32/in", "Hello from React!");
    };

    return (
        <div>
            <h2>HiveMQ React MQTT Demo</h2>
            <button onClick={sendMessage}>Send Message</button>
            <p>Last Message: {message}</p>
        </div>
    );
}

export default MqttExample;