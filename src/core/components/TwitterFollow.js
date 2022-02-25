import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TwitterFollow extends Component {
  static defaultProps = {
    showCount: "false",
    href: "https://twitter.com/twitter?ref_src=twsrc%5Etfw"
  };

  /**
   *  React.createRef to attach script after mount
   *  Ref) https://reactjs.org/docs/refs-and-the-dom.html
   */

  constructor(props) {
    super(props);
    this.twitterFollowerNode = React.createRef();

    // To render components economically w/o repetition
    this.state = {
      initialized: false,
    };
  }

  initialized() {
    this.setState({
      initialized: true,
    });
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
    if (this.state.initialized) {
      return;
    }

    // Make <script src="https://apis.google.com/js/platform.js" ></script>
    const twitterscript = document.createElement("script");
    twitterscript.src = "https://platform.twitter.com/widgets.js";
    twitterscript.async = "true";
    twitterscript.charset="utf-8"
    this.twitterFollowerNode.current.parentNode.appendChild(twitterscript);
    this.initialized();
  }

  render() {
    const { showCount, href } = this.props;

    return (
      <section className="youtubeSubscribe">
        <a
          href={href}
          ref={this.twitterFollowerNode}
          className="twitter-follow-button"
          data-show-count={showCount}
        >
          Follow @twitter
        </a>
      </section>
    );
  }
}
