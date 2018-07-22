// import React from 'react';
// import handleChange from '../components/ImagePicker';

export const posts = [
  {
    username: 'socleansofreshh',
    userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me_3.jpg',
    postImage:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/tropical_beach.jpg',
    likes: 36,
    hasBeenLiked: false,
    caption: "When you're ready for summer '18 ☀️",
    filter: 'perpetua'
  },
  {
    username: 'djirdehh',
    userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me2.png',
    postImage:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/downtown.jpg',
    likes: 20,
    hasBeenLiked: false,
    caption: 'Views from the six...',
    filter: 'clarendon'
  },
  {
    username: 'puppers',
    userImage:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/pug_personal.jpg',
    postImage:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/puppers.jpg',
    likes: 49,
    hasBeenLiked: false,
    caption: 'Current mood 🐶',
    filter: 'lofi'
  }
];

export const handleChange = data => {
  return posts.push(data);
};
