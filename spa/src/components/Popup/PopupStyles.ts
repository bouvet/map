import styled from 'styled-components';
import { MyTheme } from '../../styles/global';

interface PopUpImageProp {
    imageURL?: string;
}

export const PopupWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const PopupImage = styled.div<PopUpImageProp>`
    background: url(${(props) => props.imageURL});
    background-color: ${MyTheme.colors.gray};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 40%;
    border-radius: 10px 0px 0px 10px;
`;

export const PopupContent = styled.div`
    width: calc(60% - 20px);
    padding: 10px;
    border-radius: 0px 10px 10px 0px;
    justify-content: left;
    overflow: hidden;
`;

export const ParkName = styled.p`
    font-weight: bolder;
    padding-right: 50px;
    margin: 0px;
    font-size: ${MyTheme.fontSize.header};
    word-break: break-word;
    hyphens: auto;
    text-overflow: ellipsis;
    display: -webkit-box;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

export const BodyText = styled.div`
    justify-content: left;
    margin: 5px 0px;
    font-size: ${MyTheme.fontSize.body};
    text-overflow: ellipsis;
    display: -webkit-box;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

export const ReadMoreLink = styled.a`
    color: ${MyTheme.colors.accent};
    text-decoration: underline;
    white-space: nowrap;
    font-size: ${MyTheme.fontSize.body};
    float: right;
`;

export {};
