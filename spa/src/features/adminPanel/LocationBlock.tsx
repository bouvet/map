import { FC, useState } from 'react';
import styled from 'styled-components';
import { LeftFlex, RightFlex, SplitWrapper } from '../../components/Form/Input';
import { Text } from '../../components/Form/Text';
import { useStateDispatch, useStateSelector } from '../../hooks/useRedux';
import { MyTheme } from '../../styles/global';
import { ILocation, IPutLocation } from '../../utils/types.d';
import { mapServices } from '../map';
import { ApproveButton, RejectButton } from './ApprovalButton';
import { approvalServices } from './services/approval.services';

const LocationBlockWrapper = styled.div`
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const Title = styled(Text)`
    padding: 10px;
    overflow: hidden;
`;

const Icon = styled.span`
    color: ${MyTheme.colors.darkBase};
    font-size: ${MyTheme.fontSize.largeIcon};
    padding: 10px;
`;

export const LocationWrapper = styled.div`
    width: 90%;
    padding: 10px 5%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

const LocationSplitWrapper = styled(SplitWrapper)`
    grid-template-columns: 4fr 1fr;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0px;
`;

interface LocationProps {
    item: ILocation;
}

const LocationInformation = styled.div`
    padding: 10px;
`;

const Image = styled.img`
    width: 100%;
    margin: 10px 0px;
`;

const Li = styled.li`
    margin-left: 20px;
`;

const CategoryHeader = styled.p`
    margin-top: 10px;
`;

export const LocationBlock: FC<LocationProps> = (props) => {
    const { item } = props;
    const {
        title,
        status,
        description,
        webpImage: { cdnUri },
        category,
    } = item.properties;

    const [isActive, setIsActive] = useState(false);

    const dispatch = useStateDispatch();

    const { locations } = useStateSelector((state) => state.map);

    const handleApprove = async () => {
        const location = locations.filter((location) => location.id === item.id)[0];
        const payload: IPutLocation = {
            id: location.id,
            title: location.properties.title,
            description: location.properties.description,
            status: 'Approved',
        };
        await dispatch(approvalServices.updateLocation(payload));
        dispatch(mapServices.getLocations());
    };

    const handleReject = async () => {
        const location = locations.filter((location) => location.id === item.id)[0];
        const payload: IPutLocation = {
            id: location.id,
            title: location.properties.title,
            description: location.properties.description,
            status: 'Rejected',
        };
        await dispatch(approvalServices.updateLocation(payload));
        dispatch(mapServices.getLocations());
    };

    return (
        <LocationBlockWrapper>
            <LocationSplitWrapper>
                <LeftFlex>
                    <Title>{title.length < 25 ? title : `${title.slice(0, 22)}...`}</Title>
                </LeftFlex>
                <RightFlex>
                    <Icon className="material-symbols-outlined" onClick={() => setIsActive(!isActive)}>
                        {isActive ? 'expand_less' : 'expand_more'}
                    </Icon>
                </RightFlex>
            </LocationSplitWrapper>
            {isActive && (
                <LocationInformation>
                    <Text>{title}</Text>
                    {description}
                    <CategoryHeader>Kategorier:</CategoryHeader>
                    <ul>
                        {category.map((item) => (
                            <Li key={item.name}>{item.name}</Li>
                        ))}
                    </ul>
                    {cdnUri !== undefined && <Image src={cdnUri} alt="location" />}
                    {(() => {
                        if (status === 'Approved') {
                            return (
                                <ButtonWrapper>
                                    <RejectButton handleClick={handleReject} />
                                </ButtonWrapper>
                            );
                        }
                        if (status === 'Rejected') {
                            return (
                                <ButtonWrapper>
                                    <ApproveButton handleClick={handleApprove} />
                                </ButtonWrapper>
                            );
                        }
                        return (
                            <SplitWrapper>
                                <ButtonWrapper>
                                    <ApproveButton handleClick={handleApprove} />
                                </ButtonWrapper>
                                <ButtonWrapper>
                                    <RejectButton handleClick={handleReject} />
                                </ButtonWrapper>
                            </SplitWrapper>
                        );
                    })()}
                </LocationInformation>
            )}
        </LocationBlockWrapper>
    );
};
