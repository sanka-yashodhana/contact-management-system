"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';

import { ContactType } from '../_types/contact';
import Image from 'next/image';
import "./ContactCarousel.css"

const ContactCarousel = ({ contacts }: { contacts: ContactType[] }) => {
  const loop = contacts.length >= 3;
  const slidesPerView = contacts.length > 1 ? 'auto' : 1;
  return (
    <div className='container'>
      <h1 className='heading'>Contact List</h1>
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={loop}
      slidesPerView={slidesPerView}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      className="swiper_container"
    >
      {contacts.map((contact) => (
        <SwiperSlide key={contact._id}>
          <div className="contact-card">
            {contact.photo && <Image src={contact.photo} alt={contact.name} width={200} height={200} className='contact-photo'/>}
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
            {contact.phone && <p>{contact.phone}</p>}
            {contact.address && <p>{contact.address}</p>}
            <div className="flex gap-2 mt-2 justify-center">
                {contact.tags && contact.tags.map(tag => (
                    <span key={tag} className="badge">{tag}</span>
                ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
    </Swiper>
    </div>
  );
};

export default ContactCarousel;
