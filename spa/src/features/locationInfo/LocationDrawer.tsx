import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import { StyledEngineProvider, styled as materialStyled } from '@mui/material/styles';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import styled from 'styled-components';
import { useStateSelector } from '../../hooks/useRedux';
import { Review } from './Review';

const drawerBleeding = 56;

const Root = materialStyled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = materialStyled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = materialStyled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const ContentWrapper = styled.div`
    width: 94%;
    margin-left: 3%;
    margin-right: 3%;
    overflow-y: scroll;
`;

const ContentContainer = styled.div`
    width: 100%;
    padding: 10px 0px;
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const ImageContainer = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
    gap: 10px;
    padding: 10px 0px;
`;

const Image = styled.img`
    height: 100px;
`;

// const Img =

// const Review =

export const SwipeableEdgeDrawer: FC = () => {
    const [open, setOpen] = React.useState(true);

    const { currentlySelectedLocation } = useStateSelector((state) => state.map);
    const locationTitle = currentlySelectedLocation.properties.title;
    const locationDescription = currentlySelectedLocation.properties.description;
    const locationRating = currentlySelectedLocation.properties.rating;
    const locationImg = currentlySelectedLocation.properties.img;

    let rating = locationRating;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        console.log(newOpen);
    };

    const [stars, setStars] = useState([<span key="rating" />]);

    if (rating) {
        if (rating > 5) {
            // eslint-disable-next-line no-param-reassign
            rating = 5;
        } else if (rating < 1) {
            // eslint-disable-next-line no-param-reassign
            rating = 1;
        }
    }
    useEffect(() => {
        const temp: any[] = [];
        for (let i = 0; i < rating; i += 1) {
            temp.push(
                <span key={`${i.toString()}solid`} className="material-icons">
                    star
                </span>,
            );
        }
        for (let i = 0; i < 5 - rating; i += 1) {
            temp.push(
                <span key={`${i.toString()}outlined`} className="material-symbols-outlined">
                    star
                </span>,
            );
        }
        setStars(temp);
    }, [rating]);

    return (
        <StyledEngineProvider>
            <Root>
                <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                            height: `calc(70% - ${drawerBleeding}px)`,
                            overflow: 'visible',
                        },
                    }}
                />
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)} // set to false
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <StyledBox
                        sx={{
                            position: 'absolute',
                            top: -drawerBleeding,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            visibility: 'visible',
                            right: 0,
                            left: 0,
                        }}
                    >
                        <Puller />
                        <GridWrapper>
                            <Typography sx={{ p: 2, color: 'text.primary', fontWeight: 'bold', textAlign: 'left' }}>
                                {locationTitle}
                            </Typography>
                            <Typography sx={{ p: 2, color: 'text.primary', textAlign: 'right' }}>{stars}</Typography>
                        </GridWrapper>
                    </StyledBox>
                    <ContentWrapper>
                        <ImageContainer>
                            <Image src={locationImg} alt="location" />
                            <Image src={locationImg} alt="location" />
                            <Image src={locationImg} alt="location" />
                            <Image src={locationImg} alt="location" />
                            <Image src={locationImg} alt="location" />
                            <Image src={locationImg} alt="location" />
                            <Image src={locationImg} alt="location" />
                            <Image src={locationImg} alt="location" />
                        </ImageContainer>
                        <ContentContainer>{locationDescription}</ContentContainer>
                        <ContentContainer>
                            <b>Omtaler</b>
                        </ContentContainer>
                        <Review
                            name="Ola Nordman"
                            age={24}
                            rating={3}
                            review="This park truly is average :) perfect for me!"
                            date="24.12.2012"
                        />
                        <Review
                            name="Ola Svenskman"
                            age={222}
                            rating={1}
                            review="This park is not even close to the quality we expect in sweden! Alt for Norje, under Sverje..."
                            date="17.05.1814"
                        />
                        <Review
                            name="Kjersti Giftekniv"
                            age={74}
                            rating={5}
                            review="I meet the nicest man here! We will get married at this park, 
                            as it is something special to the both of us"
                            date="01.01.2024"
                        />
                    </ContentWrapper>
                </SwipeableDrawer>
            </Root>
        </StyledEngineProvider>
    );
};
