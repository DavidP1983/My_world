import { useEffect, useState } from "react";
import PostService from "../API/PostServiec";
import useFetching from "../hooks/useFetching";
import { Flex, Progress } from "antd";
import normalizeData from "../utils/AboutPage/normalizeData";
import parsePopulation from "../utils/AboutPage/parsePopulation";
import LoadingSkeleton from "../components/UI/loadingSkeleton/LoadingSkeleton";
import ErrorMessage from "../components/UI/error/ErrorMessage";

import "./about.scss";


const About = () => {
    const [allCountries, getAllCountries] = useState({});

    const { isLoading, isError, fetchData } = useFetching(async () => {
        const [counties, code] = await PostService.getByPopulation();

        const [countyNormalize] = normalizeData(counties, code);
        getAllCountries(countyNormalize);
    }
    );


    useEffect(() => {
        fetchData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const renderItems = (res) => {

        const content = Object.keys(res).map((item) => {
            const cardContent = res[item].map((item, i) => {
                let populationNum = parsePopulation(item.population)
                let displayNum = (populationNum / 1000000).toFixed(2);
                return (
                    <div key={item.id}>
                        <img data-attr={i === 0} src={`https://flagsapi.com/${item.code}/shiny/64.png`} alt={item.code}/>
                        <div data-attr={i === 0}>{item.country}</div>
                        <Flex vertical gap="small" className="about__content">
                            <div>{item.name}</div>
                            <Progress percent={displayNum} format={(displayNum) => displayNum > 1 ? `${displayNum} mill` : `${displayNum} K`} type="line" style={{ width: "75%" }} />
                        </Flex>
                    </div>
                );

            });
            return <li key={item}> {cardContent} </li>
        });

        return (
            <ul className="about__item">
                {content}
            </ul>
        );

    }




    const content = renderItems(allCountries);


    return (
        <div className="about">
            <h1>This page is about the population of each city</h1>
            {isLoading &&  <LoadingSkeleton/>}
            {isError && <ErrorMessage/>} 
            {content}
        </div>
    );
};

export default About;
