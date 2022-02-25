import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FacebookLike extends Component {
  static defaultProps = {
    href: "https://localhost:3000/",
    width: "30",
    layout: "button",
    action: "like",
    size: "small",
    share: "true"
  };

  /**
   *  React.createRef to attach script after mount
   *  Ref) https://reactjs.org/docs/refs-and-the-dom.html
   */

  constructor(props) {
    super(props);
    this.facebookLikeNode = React.createRef();
  }

  /**
   * 1. Script for API doesn't work in index.html.
   * 2. So You have to make it after components render.
   * 3. Make a script with JavaScript method to work.
   * 4. It is a little slow to show component at first.
   * 5. YouTube API gives you channelId instead channelName
   *    So You don't have to think about channelName when you
   *    need its API.
   */

  componentDidMount() {

    // Make <script src="https://apis.google.com/js/platform.js" ></script>
    const facebookscript = document.createElement("script");
    facebookscript.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v13.0";
    facebookscript.crossOrigin = "anonymous";
    facebookscript.async = true;
    facebookscript.defer = true;
    facebookscript.nonce = "dw4RgAND"
    this.facebookLikeNode.current.parentNode.appendChild(facebookscript);
  }

  render() {
    const { href, layout, width, action, size, share } = this.props;

    return (
      <section className="facebookLike">
        <div
        ref={this.facebookLikeNode}
          className="fb-like"
          data-href={href}
          data-width={width}
          data-layout={layout}
          data-action={action}
          data-size={size}
          data-share={share}
        ></div>
      </section>
    );
  }
}
