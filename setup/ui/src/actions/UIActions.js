export const ANIMATION_COMPLETE = 'ANIMATION_COMPLETE';
export const animationComplete = animationType => ( {
  type : ANIMATION_COMPLETE,
  animationType
} )

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = modalType => ( {
  type : TOGGLE_MODAL,
  modalType
} )

export const TOGGLE_CONFIG_DOWNLOADED = 'TOGGLE_CONFIG_DOWNLOADED';
export const toggleConfigDownloaded = () => ( {
  type : TOGGLE_CONFIG_DOWNLOADED
} )
