import React from "react"

import { BottomNavigation, BottomNavigationAction, Box} from '@material-ui/core/'
import YouTubeIcon from '@material-ui/icons/YouTube'
import HttpIcon from '@material-ui/icons/Http'
import GitHubIcon from '@material-ui/icons/GitHub'

import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <Box bgcolor="primary.main" p={0.5}/>
            
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Website" icon={<HttpIcon />} href="https://ardic.monowii.fr/" target="_blank"/>
                    <BottomNavigationAction label="YouTube" icon={<YouTubeIcon />} href="https://www.youtube.com/channel/UCYqOf7L1jm-S3uwG7yiV5tA" target="_blank"/>
                    <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} href="https://github.com/PierreVerbe/VRAC-Tool-Center" target="_blank"/>
                </BottomNavigation>
            
        </footer>
    )
}

export default Footer
