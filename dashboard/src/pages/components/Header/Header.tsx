import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import ThemeToggleButton from '@/pages/components/ThemeToggleButton';

export type HeaderProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void; }>,
}

const Header = (props: HeaderProps) =>  {
    const {ColorModeContext} = props;
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <ThemeToggleButton ColorModeContext={ColorModeContext}/>
            </Container>
        </AppBar>
    )
}

export default Header;