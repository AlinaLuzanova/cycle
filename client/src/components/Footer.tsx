import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
    backgroundColor: 'white',
    color:'black',
    padding: '16px',
    marginTop: '13vh',
    textAlign: 'center',
});

const LinkWrapper = styled('span')({
    margin: '0 8px',
});

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <Typography variant="body2" color="textSecondary">
                Developed by:
                <LinkWrapper>
                    <Link href="https://github.com/dtumanenkov">dtumanenkov</Link>
                </LinkWrapper>
                <LinkWrapper>
                    <Link href="https://github.com/russlandy">russlandy</Link>
                </LinkWrapper>
                <LinkWrapper>
                    <Link href="https://github.com/SerovNM">SerovNM</Link>
                </LinkWrapper>
                <LinkWrapper>
                    <Link href="https://github.com/viper-auto">viper-auto</Link>
                </LinkWrapper>
                <LinkWrapper>
                    <Link href="https://github.com/AlinaLuzanova">AlinaLuzanova</Link>
                </LinkWrapper>
                 | 2024
            </Typography>
        </FooterContainer>
    );
};

export default Footer;
