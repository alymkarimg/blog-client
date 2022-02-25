import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import EditableArea from '../../core/components/EditableArea';
import { isEdit } from '../../helpers/Default'
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        position: "relative"
    },
    media: {
        height: 140,
    },
});

export default function DashboardCard({ link, pathname, guid, size, fade }) {

    const classes = useStyles();

    if (isEdit()) {
        return (
                <Card raised={true} className={classes.roots}>
                    <EditableArea useloading={true} fade={fade} size={size} pathname={pathname} guid={`${guid}_image`}></EditableArea>
                </Card>
        );
    } else {
        return (
                <Card raised={true} className={classes.root}>
                    <EditableArea useloading={true} fade={fade} size={size} pathname={pathname} guid={`${guid}_image`}></EditableArea>
                </Card>
        );
    }
}

DashboardCard.propTypes = {
    pathname: PropTypes.string,
    guid: PropTypes.string,
    size: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string
    })
};
