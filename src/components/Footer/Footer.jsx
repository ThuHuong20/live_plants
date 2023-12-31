
import React from 'react'
import './Footer.scss'
export default function Footer() {
    return (
        <div className='footer_container'>
            <footer className="text-center text-lg-start bg-light text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="https://www.facebook.com/TheSillNYC/" className="me-4 text-reset">
                            <i className="fab fa-facebook-f" />
                        </a>
                        <a href='https://www.instagram.com/thesill/' className="me-4 text-reset">
                            <i className="fab fa-instagram" />
                        </a>
                        <a href='https://www.pinterest.com/thesillnyc/' className="me-4 text-reset">
                            <i class="fa-brands fa-pinterest-p"></i>
                        </a>
                        <a href='https://www.youtube.com/thesill' className="me-4 text-reset">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                        <a href='https://www.tiktok.com/@thesill' className="me-4 text-reset">
                            <i class="fa-brands fa-tiktok"></i>
                        </a>
                    </div>
                </section>
                <section className>
                    <div className="container text-center text-md-start mt-5"> <div className="row mt-3"> <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Customer Service
                        </h6>
                        <p>
                            <a href="https://www.thesill.com/pages/faq" className="text-reset">FAQ</a>
                        </p>
                        <p>
                            <a href="https://www.thesill.com/pages/shipping-and-handling" className="text-reset">Shipping & Handling</a>
                        </p>
                        <p>
                            <a href="https://www.thesill.com/pages/guarantee" className="text-reset">30-Day Guarantee</a>
                        </p>
                        <p>
                            <a href="https://www.thesill.com/pages/contact" className="text-reset">Contact Us</a>
                        </p>
                    </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Resources
                            </h6>
                            <p>
                                <a href="https://thesill.typeform.com/find-your-plant" className="text-reset">Find Your Plant</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/pages/care-library" className="text-reset">Plant Care Library</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/blog" className="text-reset">Blog</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/courses/plant-care-101" className="text-reset">Free Online Course</a>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                My Sill
                            </h6>
                            <p>
                                <a href="/longin" className="text-reset">My Account</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/categories/workshops-and-events" className="text-reset">Workshops</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/pages/about-us" className="text-reset">Rewards Program</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/pages/about-us" className="text-reset">Track My Order</a>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Explore
                            </h6>
                            <p>
                                <a href="https://www.thesill.com/pages/about-us" className="text-reset">Our Story</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/locations" className="text-reset">Locations</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/pages/careers" className="text-reset">Careers</a>
                            </p>
                            <p>
                                <a href="https://www.thesill.com/pages/corporate-gifting" className="text-reset">Corporate Gifting</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3" /> New York, NY 10012, US</p>
                            <p>
                                <i className="fas fa-envelope me-3" />
                                info@example.com
                            </p>
                            <p><i className="fas fa-phone me-3" /> + 01 234 567 88</p>
                            <p><i className="fas fa-print me-3" /> + 01 234 567 89</p>
                        </div>
                    </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    2023-Live Plant,Inc.
                </div>
            </footer>
        </div>
    )
}
