import React from "react";
import Card from "./Card";

const Grid = () => {
    return (
        <div className="Grid">
            <Card HackathonName='Dell & Nividia Hackathon' Dates='Aug 14 - Oct 02, 2024' 
                imageUrl='../../src/Dell-Nividia-Hackathon.png'
                HackathonUrl='https://hackaichallenge.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='VCT Hackathon' Dates='Sep 04 - Oct 23, 2024' 
                imageUrl='../../src/VCT-Hackathon.jpg'
                HackathonUrl='https://vcthackathon.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='Microsoft Fabric and AI Learning Hackathon' Dates='Sep 24 - Nov 12, 2024' 
                imageUrl='../../src/Microsoft-Hackathon.png'
                HackathonUrl='https://microsoftfabric.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='TRON Grand Hackathon - HackaTRON Season 7' Dates='Jul 24 - Oct 08, 2024' 
                imageUrl='../../src/Tron-Hackathon.png'
                HackathonUrl='https://hackatron7.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='Forest Hacks' Dates='July 25 - Oct 08, 2024' 
                imageUrl='../../src/Forest-Hackathon.png'
                HackathonUrl='https://foresthacks.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='[REDACTED] Hackathon' Dates='May 25 - Oct 31, 2024' 
                imageUrl='../../src/Redacted-Hackathon.jpg'
                HackathonUrl='https://redacted.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='SummerHacks By YCW' Dates='Jun 10 - Oct 06, 2024' 
                imageUrl='../../src/YCW-Hackathon.png'
                HackathonUrl='https://summerhacks24.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='Twitch Streamer Tools Hackathon' Dates='Aug 19 - Sep 30, 2024' 
                imageUrl='../../src/Twitch-Hackathon.png'
                HackathonUrl='https://twitchstreamertools.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='AfroTech AI Hackathon' Dates='Aug 19 - Sep 30, 2024' 
                imageUrl='../../src/AfroTech-Hackathon.png'
                HackathonUrl='https://afrotech.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='InnovateHacks 2.0' Dates='Jul 11 - Oct 11, 2024' 
                imageUrl='../../src/Innovative-Hackathon.png'
                HackathonUrl='https://innovatedhs.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
            <Card HackathonName='IngeniumSTEM Summer Hacks 2.0' Dates='Jul 11 - Oct 11, 2024' 
                imageUrl='../../src/Ingenium-Hackathon.png'
                HackathonUrl='https://ingenium-stem-2.devpost.com/?ref_feature=challenge&ref_medium=discover'/>

            <Card HackathonName='EduLearns - The Biggest Summer Hackathon' Dates='Jul 25 - Sep 30, 2024' 
                imageUrl='../../src/Edu-Hackathon.png'
                HackathonUrl='https://elsummer.devpost.com/?ref_feature=challenge&ref_medium=discover'/>
        </div>
    )
}

export default Grid;