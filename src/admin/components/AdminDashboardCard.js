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
import EditableArea from '../../core/components/EditableArea';
import { isEdit } from '../../helpers/Default'
import PropTypes from 'prop-types';

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

export default function MediaCard({ link, pathname, guid, size, fade }) {

    const classes = useStyles();

    if (isEdit()) {
        return (
            <Card raised={true} className={classes.roots}>
                <EditableArea useloading={true} fade={fade} size={size} pathname={pathname} guid={`${guid}_image`}></EditableArea>
            </Card>
        );
    } else {
        return (
            <Link to={link} style={{ textDecoration: 'none' }}>
                <Card raised={true} className={classes.root}>
                    <EditableArea useloading={true} fade={fade} size={size} pathname={pathname} guid={`${guid}_image`}></EditableArea>
                </Card>
            </Link>
        );
    }
}

MediaCard.propTypes = {
    pathname: PropTypes.string,
    guid: PropTypes.string,
    size: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string
    })
};
