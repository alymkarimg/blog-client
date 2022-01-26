/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../layouts/Layout'
import BlogCard from './components/BlogCard'
import axios from 'axios'
import EditableArea from '../core/components/EditableArea';
import SimpleSelect from '../core/components/Select';
import MultipleSelect from '../core/components/MultipleSelect'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const BlogCardItem = (props) => {
    const [values, setValues] = useState({
      blog: null,
    });
  
    const { blog } = values;
  
    useEffect(() => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/blogs/${props.match.params.slug}`,
      })
        .then((response) => {
          if (response.data.errors && response.data.errors.length > 0) {
            response.data.errors.forEach((error) => {
              toast.error(error.message);
            });
          } else if (response.data.blog) {
            setValues({ ...values, blog: response.data.blog });
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
          error.response.data.errors.forEach((error) => {
            toast.error(error.message);
          });
        });
    }, []);
  
    return (
      <Layout>
        {blog && (
          <div className="blogCardItem col-md-10 offset-md-1">
            <BlogCard
              blog={blog}
              size={{ height: "auto", width: "100%" }}
              truncate={false}
              readMoreButton={false}
            ></BlogCard>
          </div>
        )}
      </Layout>
    );
  };

export default BlogCardItem;
