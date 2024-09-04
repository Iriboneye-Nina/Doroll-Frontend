import React, { useState } from "react";
import Footer from "@/components/shared/layout/footer";
import Navbar from "@/components/shared/layout/navbar";
import SettingsForm from "@/components/settings";
import Content from "@/components/content";


export default function Home() {
    const [isContent, setIsContent] = useState(true);
    const [isSetting, setIsSetting] = useState(false);
    const handleContent = () => {
        setIsContent(true);
        setIsSetting(false);
    };

    const handleSetting = () => {
        setIsContent(false);
        setIsSetting(true);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar pass={handleContent} click={handleSetting} />
            <main className="flex-grow mt-0">
                {isSetting && <SettingsForm />}
                {isContent && <Content />}
            </main>
            <Footer />
        </div>
    );
}