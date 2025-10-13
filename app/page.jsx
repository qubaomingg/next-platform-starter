
"use client";
import { useEffect, useState } from 'react';
import '../styles/ai-eryou.css';

export default function Page() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [lightboxImage, setLightboxImage] = useState('');
    const [isBlurred, setIsBlurred] = useState(false);
    const [showMobileHint, setShowMobileHint] = useState(false);
    const [touchStartY, setTouchStartY] = useState(null);
    const [touchEndY, setTouchEndY] = useState(null);
    const totalSlides = 7;


    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        if (window.innerWidth <= 768) {
            setShowMobileHint(true);
            const timer = setTimeout(() => {
                setShowMobileHint(false);
            }, 5000);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                clearTimeout(timer);
            };
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleTouchStart = (e) => {
        setTouchStartY(e.touches[0].clientY);
        setTouchEndY(null); // Reset endY on new touch
    };

    const handleTouchMove = (e) => {
        setTouchEndY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (touchStartY === null || touchEndY === null) {
            return;
        }
        const deltaY = touchStartY - touchEndY;
        if (deltaY > 50) {
            nextSlide();
        } else if (deltaY < -50) {
            prevSlide();
        }
        setTouchStartY(null);
        setTouchEndY(null);
    };

    const handleImageClick = (e) => {
        setLightboxImage(e.target.src);
        setLightboxVisible(true);
        setIsBlurred(true);
    };

    const handleLightboxClick = () => {
        setLightboxVisible(false);
        setLightboxImage('');
        setIsBlurred(false);
    };
    console.log(currentSlide);
    return (
        <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className={isBlurred ? 'blur-background' : ''}>
                <div id="slide1" className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
                    <div className="title-container">
                        <div className="heart"></div>
                        <div className="heart"></div>
                        <div className="heart"></div>
                        <div className="heart"></div>
                        <h1>神奇的「人工智能」</h1>
                    </div>
                </div>

                <div id="slide2" className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
                    <div className="content-split">
                        <div className="title-side">
                            <h2>智能家居</h2>
                            <p>我们可以让AI管家帮忙开灯、播放音乐、打扫卫生，让家变得更聪明！</p>
                        </div>
                        <div className="media-side">
                            <div className="media-container">
                                <video controls loop poster="/assets/poster1.png">
                                    <source src="/assets/smart-home.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="slide3" className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
                    <div className="content-split">
                        <div className="title-side">
                            <h2>智能出行</h2>
                            <p>未来的汽车可以自己开，可以语音控制任何功能，带我们去想去的地方。</p>
                        </div>
                        <div className="media-side-vertical">
                            <div className="media-container">
                                <video controls loop poster="/assets/poster3.png">
                                    <source src="/assets/smart-travel-autopilot.webm" type="video/webm" />
                                </video>
                            </div>
                            <div className="media-container">
                                <video controls loop poster="/assets/poster2.png">
                                    <source src="/assets/smart-travel-voice-control.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="slide4" className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
                    <div className="content-split">
                        <div className="title-side">
                            <h2>智能创作</h2>
                            <p>告诉AI我们想画什么，无论是小猫还是太空船，AI都能画出来！</p>
                        </div>
                        <div className="media-side-vertical">
                            <div className="media-grid media-container">
                                <img src="/assets/AI创作-图片.png" alt="AI generated art 1" className="grid-img" onClick={handleImageClick} />
                                <img src="/assets/AI创作-图片2.png" alt="AI generated art 2" className="grid-img" onClick={handleImageClick} />
                            </div>
                            <div className="media-grid media-container">
                                <video controls loop poster="/assets/poster4.png">
                                    <source src="/assets/smart-creation-paw-patrol.webm" type="video/webm" />
                                </video>
                                <video controls loop poster="/assets/poster7.png">
                                    <source src="/assets/ai-creation-interview.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="slide5" className={`slide ${currentSlide === 4 ? 'active' : ''}`}>
                    <div className="content-split">
                        <div className="title-side">
                            <h2>AI 玩伴</h2>
                            <p>AI可以成为我们的好朋友，陪我们聊天、玩游戏，在孤单的时候给予温暖。</p>
                        </div>
                        <div className="media-side-horizontal">
                            <div className="media-container">
                                <video controls loop poster="/assets/poster5.png">
                                    <source src="/assets/ai-companion-doubao.webm" type="video/webm" />
                                </video>
                            </div>
                            <div className="media-container">
                                <video controls loop poster="/assets/poster6.png">
                                    <source src="/assets/ai-companion-loss.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>




                <div id="slide6" className={`slide ${currentSlide === 5 ? 'active' : ''}`}>
                    <div className="summary-container">
                        <h1>AI是我们的好朋友</h1>
                        <div className="summary-grid">
                            <div className="summary-card">
                                <h3>智能家居</h3>
                                <p>让家更聪明，生活更轻松！</p>
                            </div>
                            <div className="summary-card">
                                <h3>智能出行</h3>
                                <p>让出行更安全，更便捷！</p>
                            </div>
                            <div className="summary-card">
                                <h3>智能创作</h3>
                                <p>激发想象力，创造无限可能！</p>
                            </div>
                            <div className="summary-card">
                                <h3>AI 玩伴</h3>
                                <p>孤独时陪伴，快乐时分享！</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="slide7" className={`slide ${currentSlide === 6 ? 'active' : ''}`}>
                    <div className="title-container">
                        <div className="heart"></div>
                        <div className="heart"></div>
                        <div className="heart"></div>
                        <div className="heart"></div>
                        <h1>认识小三班的新同学-小白</h1>
                    </div>
                </div>
            </div>
            {lightboxVisible && (
                <div id="lightbox" onClick={handleLightboxClick}>
                    <img id="lightbox-img" src={lightboxImage} />
                </div>
            )}
            {showMobileHint && <div className="mobile-hint">左右点击或上下滑动切换</div>}
            <div className="mobile-nav-left" onClick={prevSlide}></div>
            <div className="mobile-nav-right" onClick={nextSlide}></div>
        </div>
    );
}
