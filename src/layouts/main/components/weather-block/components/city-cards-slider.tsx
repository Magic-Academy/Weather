import { FC, memo, useState, useCallback } from "react";
import { Box, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import Slider from "react-slick";
// store
import { getWeatherData } from "@store/weather/weather-data.store";
// components
import CityCard from "@components/UI/city-card/city-card";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// icons
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 44%;
  color: green !important;
  &:hover {
    color: blue !important;
  }
`;

const Component = styled(Box)`
  padding: 0 20px 0 20px;
`;

const CityCardsSlider: FC = (): JSX.Element => {
  const weatherData = useSelector(getWeatherData());
  const [isDragging, setIsDragging] = useState(false);

  const SampleNextArrow: FC<any> = ({ onClick }) => {
    return (
      <StyledIconButton style={{ right: -34 }} onClick={onClick}>
        <ArrowForwardIosOutlinedIcon />
      </StyledIconButton>
    );
  };

  const SamplePrevArrow: FC<any> = ({ onClick }) => {
    return (
      <StyledIconButton style={{ left: -40 }} onClick={onClick}>
        <ArrowBackIosNewOutlinedIcon />
      </StyledIconButton>
    );
  };

  const handleBeforeChange = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleAfterChange = useCallback(() => {
    setIsDragging(false);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange
  };

  return (
    <Component>
      <Slider {...settings}>
        {Object.keys(weatherData)?.map((city) => {
          return <CityCard city={city} key={city} isDragging={isDragging} />;
        })}
      </Slider>
    </Component>
  );
};

export default memo(CityCardsSlider);
