import React from "react"

import { BottomNavigation, BottomNavigationAction} from '@material-ui/core/'
import YouTubeIcon from '@material-ui/icons/YouTube'
import HttpIcon from '@material-ui/icons/Http'
import GitHubIcon from '@material-ui/icons/GitHub'

const Footer = () => {
    return (
        <footer>
            <BottomNavigation showLabels>
                <BottomNavigationAction label="Website" icon={<HttpIcon />} href="https://ardic.monowii.fr/" target="_blank"/>
                <BottomNavigationAction label="YouTube" icon={<YouTubeIcon />} href="https://www.youtube.com/channel/UCYqOf7L1jm-S3uwG7yiV5tA" target="_blank"/>
                <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} href="https://github.com/PierreVerbe/VRAC-Tool-Center" target="_blank"/>
            </BottomNavigation>
        </footer>
    )
}

export default Footer
