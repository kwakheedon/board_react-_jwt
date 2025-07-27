import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Swiper 기본 CSS 파일 임포트
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 카드 스타일링을 위한 별도의 CSS 파일
// import './MainListView.css'; 


const MainListView = ({ posts }) => {
  console.log(" posts 상태:", posts);

  const recentPosts = posts.slice(0, 5);

  if (recentPosts.length === 0) {
    return <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--toss-gray-dark)'}}>게시글이 없습니다.</div>;
  }

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      
      // 자동 재생 옵션을 추가
      autoplay={{
        delay: 1500, // 2.5초마다 넘어갑니다.
        disableOnInteraction: false, // 사용자가 조작한 후에도 자동 재생이 멈추지 않음
      }}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        320: {
          slidesPerView: 1,
        }
      }}
      pagination={{ clickable: true }}
      navigation={true}
    
      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      {recentPosts.map(post => (
        <SwiperSlide key={post.postId}>
          <Link to={`/posts/${post.postId}`} className="card-link">
            <div className="card-content">
              <h3>{post.title}</h3>
              <p>작성자: {post.writerNickname || '익명'}</p> 
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainListView;
