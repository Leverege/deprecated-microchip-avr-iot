import React from 'react';
import AnimateHeight from 'react-animate-height';
import FeatherIcon from 'feather-icons-react';
import dropdownCaret from '../../images/dropdownCaret.svg';

import './CollapsibleSection.less';

export default class CollapsibleSection extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      isCollapsed : true,
    }
  }

  toggleCollapse = () => {
    this.setState({ isCollapsed : !this.state.isCollapsed })
  }

  render() {
    const { title, className, children } = this.props;
    const { isCollapsed, id } = this.state;

    return (
      <section className={`collapsible-section${this.props.className}`} onClick={this.toggleCollapse}>
        <h3 className="collapsible-section-header">
          <span className={`collapsible-section-header-icon ${isCollapsed ? 'collapsed' : ''}`}>
            <img src={dropdownCaret} />
          </span>
          <span className="collapsible-section-header-text">
            {title}
          </span>
        </h3>
        <AnimateHeight
          duration={500}
          animateOpacity
          height={isCollapsed ? 0 : 'auto'}
        >
          { children }
        </AnimateHeight>
      </section>
    )
  }
}
