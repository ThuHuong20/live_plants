
import './Banner.scss'
const Banner = () => {
    return (
        <div className='banner_container'>
            <div className='title_box'>
                <span className='banner_title'>JUST IN! New, Easy-Care Cactus Plants</span>
            </div>
            <div className='content_box'>
                <div className='content_text'>
                    <h1>Join Our <br />Rewards Program</h1>
                    <p>Become a member today and earn 1 point for every $1 spent. Redeem your points for future savings on products and more.</p>
                    <button type="button" class="btn btn-success">Learn More</button>
                </div>
                <div className='content_image'>
                    <img className="image" src='../image/banner/banner5.webp' />
                </div>
            </div>
        </div>
    )

};
export default Banner;