import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/index";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

/***
 * NOTE: this currently gives a warning in the console:
 * "Warning: FontAwesomeIcon: Support for defaultProps will be removed from function components
 * in a future major release. Use JavaScript default parameters instead."
 * I didn't write an issue because I can't reproduce it in codepen:
 * https://codepen.io/meganrm/pen/BagJvXZ
 */
const LinkOut = () => (
    <FontAwesomeIcon
        style={{ marginLeft: 6 }}
        icon={faUpRightFromSquare as IconProp}
    />
);
export default LinkOut;
