// const ParticlesParams = {
//   particles: {
//     number: {
//       value: 80,
//       density: {
//         enable: true,
//         value_area: 800,
//       },
//     },
//     color: {
//       value: '#ffffff',
//     },
//     shape: {
//       type: 'polygon',
//       stroke: {
//         width: 0,
//         color: '#000000',
//       },
//       polygon: {
//         nb_sides: 6,
//       },
//       image: {
//         src: '',
//         width: 160,
//         height: 140,
//       },
//     },
//     opacity: {
//       value: 0.2,
//       random: false,
//       anim: {
//         enable: false,
//         speed: 1,
//         opacity_min: 0.1,
//         sync: false,
//       },
//     },
//     size: {
//       value: 2,
//       random: true,
//       anim: {
//         enable: true,
//         speed: 1.2,
//         size_min: 0.1,
//         sync: false,
//       },
//     },
//     line_linked: {
//       enable: true,
//       distance: 150,
//       color: '#ffffff',
//       opacity: 0.2,
//       width: 1,
//     },
//     move: {
//       enable: true,
//       speed: 1.1,
//       direction: 'right',
//       random: false,
//       straight: false,
//       out_mode: 'out',
//       bounce: false,
//       attract: {
//         enable: false,
//         rotateX: 600,
//         rotateY: 1200,
//       },
//     },
//   },
//   interactivity: {
//     detect_on: 'window',
//     events: {
//       onhover: {
//         enable: true,
//         mode: 'grab',
//       },
//       onclick: {
//         enable: false,
//         mode: 'push',
//       },
//       resize: true,
//     },
//     modes: {
//       grab: {
//         distance: 150,
//         line_linked: {
//           opacity: 0.5,
//         },
//       },
//       bubble: {
//         distance: 400,
//         size: 40,
//         duration: 2,
//         opacity: 8,
//         speed: 3,
//       },
//       repulse: {
//         distance: 200,
//         duration: 0.4,
//       },
//       push: {
//         particles_nb: 4,
//       },
//       remove: {
//         particles_nb: 2,
//       },
//     },
//   },
//   retina_detect: true,
// };

// export default ParticlesParams;

const ParticlesParams = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out',
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};

export default ParticlesParams;
