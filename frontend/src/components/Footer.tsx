import './Footer.css';

interface FooterProps {
    title: string;
  }
const Footer = (props:FooterProps) => {
    return (
        <footer>
        <p>{props.title}</p>
        </footer>
    );
}
    export default Footer;