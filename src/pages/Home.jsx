import { Card, Carousel } from 'antd';
import { eath, paris, tokyo, london } from '../assets/index';
import './home.scss';


const content = [
    {src: paris, clazz: "images", title: "Paris"},
    {src: tokyo, clazz: "images", title: "Tokyo"},
    {src: london, clazz: "images", title: "London"}
]

const Home = () => {
    return (
        <Card
            hoverable
            style={{ width: 440 }}
            cover={<img className='home' alt="eath" src={eath} />}
        >

            <Carousel autoplay>
            {content.map(({src, clazz, title}) => 
                <div className={clazz} key={title}>
                    <div className='carousel'>
                    <img src={src} alt={title} />
                    <h3 className='desc'>{title}</h3>
                    </div>
            </div>
            )}
             
            </Carousel>
        </Card>
    );
}

export default Home;