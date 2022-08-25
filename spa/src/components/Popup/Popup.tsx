import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../../styles/global';
import { mapActions } from '../../store/state/map.state';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { RoundButton } from '../Navigation/Buttons';


interface PopupProps {
    name: string;
    description: string;
    rating: number;
}

interface VisibilityProp {
    visibility: string;
}

const PopupWrapper = styled.div<VisibilityProp>`
    width: 92%;
    height: 150px;
    background-color: ${MyTheme.colors.lightbase};
    position: fixed;
    bottom: 10px;
    right: 4%;
    border-radius: 10px;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    display: ${props => props.visibility};
`;

const PopupImage = styled.div`
    background: url('https://minsak.no/uploads/1467014530_865438838.full.jpg');
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 40%;
    border-radius: 10px 0px 0px 10px;
`;

const CloseBtn = styled(RoundButton)`
    position: absolute;
    height: 40px;
    width: 40px;
    top: 10px;
    left: 10px;
    &:active {
        background-color: ${MyTheme.colors.darkbase};
    }
`

const PopupContent = styled.div`
    width: calc(60% - 20px);
    padding: 10px;
    border-radius: 0px 10px 10px 0px;
    justify-content: left;
    overflow: hidden;
`;

const Parkname = styled.p`
    font-weight: bolder;
    margin: 0px;
    font-size: ${MyTheme.fontSize.header};
`

const Rating = styled.div`
    width: 100%;
    color: ${MyTheme.colors.accent};

`;

const Bodytext = styled.p`
    justify-content: left;
    margin: 5px 0px;
    font-size: ${MyTheme.fontSize.body};
`
/**
 * Popup component which displays brief information about the park
 * @param name string containing name of park 
 * @param description string containing description of park
 * @param rating number with rating of park 1-5 
 */
export const Popup: React.FunctionComponent<PopupProps> = ({name, description, rating}) => {

    const handleClick = () => {
        console.log("Clicked");
        setVisibility("none");
    };

    const [stars, setStars] = useState([<span></span>]);
    const [visibility, setVisibility] = useState("flex");

    if (rating > 5) {
        rating = 5;
    } else if (rating < 1) {
        rating = 1;
    }
    useEffect(() => {
        let temp: any[] = []
        for (let i=0; i<rating; i++) {
            temp.push(
                <span key={i.toString() + "solid"} className="material-symbols-rounded">
                    star
                </span>
            )
        }
        for (let i=0; i < (5-rating);i++) {
            temp.push(
                <span key={i.toString() + "outlined"} className="material-symbols-outlined">
                    star
                </span>
            )
        }
        setStars(temp);
        console.log(stars);
    }, []);

    return (
        <PopupWrapper visibility={visibility}>
            <PopupImage>
                <CloseBtn backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={handleClick}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </CloseBtn>
            </PopupImage>
            <PopupContent>
                <Parkname>{name}</Parkname>
                <Rating>
                {stars}
                </Rating>
                <Bodytext>{description}</Bodytext>
            </PopupContent>
        </PopupWrapper>
    );
};

