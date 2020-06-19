import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditableArea from './EditableArea';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        position: "relative"
    },
    media: {
        height: 140,
    },
});

function changeBackground(e) {
    e.target.className = 'dark-overlay';
}

function removeBackground(e) {
    e.target.className = '';
}

export default function MediaCard({ link, pathname, guid }) {
    const classes = useStyles();

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Card raised={true} className={classes.root}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transition: "0.3s ease"}} onMouseOver={changeBackground} onMouseLeave={removeBackground}></div>
                <EditableArea pathname={pathname} guid={`${guid}_image`}></EditableArea>
            </Card>
        </Link>
    );
}
