import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getImageURL, toHumanString, truncate } from '../../helpers/Default'
import EditableArea from '../../core/components/EditableArea';
import '../assets/css/Style.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: '3 1',
        justifyContent: 'space-between'
    },
    content: {
        flex: '2 1',
    },
    cover: {
        maxWidth: "25%",
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        float: 'left'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    actions: {
        justifyContent: 'space-between',
        width: '100%',
        display: 'flex'
    }
}));

function changeBackground(e) {
    e.target.className = 'dark-overlay';
}

function removeBackground(e) {
    e.target.className = '';
}

export default function BlogCard({ blog }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        expanded: false,
        title: '',
        subtitle: '',
        contentSnippet: '',
        datePublished: '',
        comment: '',
        popular: '',
        category: ''
    });

    const { title, content, datePublished, comments, popular, contentSnippet, expanded } = values

    const handleExpandClick = () => {
        setValues({ ...values, expanded: !expanded });
    };

    return (

        <Card className={classes.root
        } raised={true} >
            <div className={classes.details}>
                <CardHeader
                    avatar={
                        <Avatar aria-label={title} className={classes.avatar}></Avatar>
                    }
                    title={<Typography gutterBottom variant="h5" component="h2">
                    {blog.title}
                </Typography>}
                    subheader={<Typography gutterBottom variant="p" component="p">
                    {toHumanString(blog.publishedDate)}
                </Typography>}
                />
                <CardContent className={classes.blogCard}>
                    <EditableArea truncate={400} size={{ width: "100%", height: "100%" }} useloading={true} fade={false} pathname={`blog editableArea`} guid={`blog ${blog.slug}`} />
                </CardContent>
                <div className={classes.controls}>
                    <CardActions className={classes.actions} disableSpacing>
                        <div>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </div>
                        <Link to='/auth/password/forgot' style={{ margin: "20px 10px" }} className="btn btn-sm btn-outline-info"> Read more </Link>
                    </CardActions>
                </div>
            </div>
            <CardMedia
                component={"img"}
                className={classes.cover}
                image={getImageURL("paella.jpg")}
                title="Paella dish"
            />
        </Card >
    )
}
