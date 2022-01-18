/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Layout from "../layouts/Layout";
import BlogCard from "./components/BlogCard";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import EditableArea from "../core/components/EditableArea";
import SimpleSelect from "../core/components/Select";
import MultipleSelect from "../core/components/MultipleSelect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { GlobalContext } from "../contexts/GlobalContext";

const Blogs = () => {
  const [values, setValues] = useState({
    blogs: [],
    allBlogs: [],
    categorysToFilter: [],
    timeToFilter: null,
    authorsToFilter: [],
    monthsToFilter: [],
    sortBy: null,
  });

  const [boolean, setBoolean] = useState(true);

  const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: red[500],
    },

    sort: {
      marginRight: "20px",
    },
  }));

  const classes = useStyles();

  const {
    blogs,
    allBlogs,
    categorysToFilter,
    timeToFilter,
    monthsToFilter,
    authorsToFilter,
    sortBy,
  } = values;

  let { categories, loading } = useContext(GlobalContext);
  useEffect(() => {
    if (categories && categories.length > 0) {
      fetchData();
      function fetchData() {}
    }
  }, [loading]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/blogs/`,
    })
      .then((response) => {
        setValues({
          ...values,
          blogs: response.data.blogs,
          allBlogs: response.data.blogs,
          sortBy: "Newest listed",
          timeToFilter: "All time"
        });

      })
      .catch((error) => {
        console.log(error);
        error.response.data.errors.forEach((error) => {
          toast.error(error.message);
        });
      });
  }, []);

  const onChangeSort = (value) => {
    setValues({
      ...values,
      sortBy: value,
    });
  };

  const onChangeCategories = (value) => {
    setValues({
      ...values,
      categorysToFilter: [...value].map((q) => q.toLowerCase()),
    });
  };

  const onChangeAuthors = (value) => {
    setValues({
      ...values,
      authorsToFilter: [...value].map((q) => q.toLowerCase()),
    });
  };

  const onChangeTime = (value) => {
    setValues({
      ...values,
      timeToFilter: value,
    });
  };

  const onChangeMonth = (value) => {
    setValues({
      ...values,
      monthsToFilter: [...value].map((q) => q.toLowerCase()),
    });
  };

  useEffect(() => {
    const convertTimeToFilterToDateTime = (value) => {
      const timeNow = new Date(Date.now());
      switch (value) {
        case "All time":
          return null;
        case "Past hour":
          return new Date(
            timeNow.setHours(timeNow.getHours() - 1)
          ).toISOString();
        case "Past 24 hours":
          return new Date(
            timeNow.setHours(timeNow.getHours() - 24)
          ).toISOString();
        case "Past week":
          return new Date(timeNow.setDate(timeNow.getDate() - 7)).toISOString();
        case "Past month":
          return new Date(
            timeNow.setMonth(timeNow.getMonth() - 1)
          ).toISOString();
        case "Past year":
          return new Date(
            timeNow.setFullYear(timeNow.getFullYear() - 1)
          ).toISOString();
      }
    };

    if (
      (allBlogs.length > 0 && categorysToFilter.length > 0) ||
      timeToFilter ||
      authorsToFilter.length > 0 ||
      monthsToFilter.length > 0
    ) {
      let filteredBlogs = [...allBlogs];

      if (categorysToFilter.length > 0) {
        filteredBlogs = filteredBlogs.filter((q) => {
          var blogIncludesCategoriesToFilter = q.categories.map((category) => {
            if (categorysToFilter.includes(category.slug)) {
              return true;
            } else {
              return false;
            }
          });
          if (blogIncludesCategoriesToFilter.includes(true)) {
            return q;
          }
        });
      }

      if (authorsToFilter.length > 0) {
        filteredBlogs = filteredBlogs.filter((q) => {
          if (authorsToFilter.includes(q.author)) {
            return true;
          } else {
            return false;
          }
        });
      }

      if (monthsToFilter.length > 0) {
        filteredBlogs = filteredBlogs.filter((q) => {
          const blogMonthPublished = new Date(q.publishedDate)
            .toLocaleString("default", { month: "long" })
            .toLowerCase();
          if (monthsToFilter.includes(blogMonthPublished)) {
            return true;
          } else {
            return false;
          }
        });
      }

      if (timeToFilter) {
        filteredBlogs = filteredBlogs.filter((q) => {
          const cutOffTime = convertTimeToFilterToDateTime(timeToFilter);
          if (
            cutOffTime == null ||
            new Date(q.publishedDate) >= new Date(cutOffTime)
          ) {
            return true;
          } else {
            return false;
          }
        });
      }

      if (sortBy == "Oldest listed") {
        filteredBlogs.sort(
          (a, b) => new Date(a.publishedDate) > new Date(b.publishedDate)
        );
      } else if (sortBy == "Newest listed") {
        filteredBlogs.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );
      } else if (sortBy == "Most Popular") {
      }

      setValues({ ...values, blogs: filteredBlogs });
    } else {
      let filteredBlogs = [...allBlogs];
      if (sortBy == "Oldest listed") {
        filteredBlogs.sort(
          (a, b) => new Date(a.publishedDate) > new Date(b.publishedDate)
        );
      } else if (sortBy == "Newest listed") {
        filteredBlogs.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );
      } else if (sortBy == "Most Popular") {
      }

      setValues({ ...values, blogs: [...filteredBlogs] });
    }
  }, [
    categorysToFilter,
    authorsToFilter,
    monthsToFilter,
    timeToFilter,
    sortBy,
  ]);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <EditableArea
            fade={true}
            pathname="/blog"
            guid="EA_blog_title"
          ></EditableArea>
        </div>
        {/* <div className="col-md-12" style={{ marginBottom: "10px" }}>
                    <p>Search</p>
                    <div style={{ width: "33%" }}>
                        <TextField id="search_blogs" fullWidth />
                    </div>
                </div> */}
        <div
          className="col-md-12"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div
            style={{
              MarginRight: "15px",
              MarginLeft: "-15px",
              marginBottom: "10px",
            }}
          >
            <p>Sort</p>
            <div
              className="sort"
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0px 0px 20px 0px",
              }}
            >
              <SimpleSelect
                onChange={onChangeSort}
                value={sortBy}
                sort="Newest listed"
                title="By"
                menuitems={[
                  "Newest listed",
                  "Oldest listed",
                  "Most popular - not implemented yet",
                ]}
              />
            </div>
          </div>
          <div>
            <p>Filter</p>
            <div
              className="filter"
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0px 0px 20px 0px",
              }}
            >
              <SimpleSelect
                value={timeToFilter}
                sort={"All time"}
                onChange={onChangeTime}
                title="Time"
                menuitems={[
                  "All time",
                  "Past hour",
                  "Past 24 hours",
                  "Past week",
                  "Past month",
                  "Past year",
                ]}
              />
              <MultipleSelect
                loadMenuItems={"blog"}
                value={categorysToFilter}
                title="Category"
                onChange={onChangeCategories}
              />
              {allBlogs && (
                <MultipleSelect
                  onChange={onChangeAuthors}
                  value={authorsToFilter}
                  title="Author"
                  menuitems={[...allBlogs.map((q) => q.author)]}
                />
              )}
              <MultipleSelect
                value={monthsToFilter}
                title="Month"
                onChange={onChangeMonth}
                menuitems={[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ]}
              />
            </div>
          </div>
        </div>
        <div className="row col-md-12">
          <div className="col-md-9">
            {blogs.map((blog, i) => {
              return (
                <Fragment key={`blog${blog.slug}`}>
                  <div
                    className="fade-in blogCard"
                    style={{ marginBottom: "20px" }}
                  >
                    <BlogCard readMoreButton={true} blog={blog} />
                  </div>
                </Fragment>
              );
            })}
          </div>
          <div
            className="col-md-3 fade-in ml-auto"
            style={{
              paddingRight: "0px",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <Card fadeclassName={classes.root + " fade-in"} raised={true}>
              <div className={classes.details}>
                <CardContent>
                  <h2 style={{ textAlign: "center" }}>Categories</h2>
                  {categories.length > 0 &&
                    categories
                      .filter(function (x) {
                        return x !== undefined;
                      })
                      .filter((p) => p.type === "blog")
                      .map((q) => {
                        return (
                          <div
                            key={q.slug}
                            onClick={(event) => {
                              setBoolean(!boolean);
                              if (
                                categorysToFilter.includes(
                                  event.currentTarget.innerText.toLowerCase()
                                )
                              ) {
                                if (categorysToFilter.length == 1) {
                                  if (boolean) {
                                    onChangeCategories([q].map((q) => q.slug));
                                  } else {
                                    setValues({
                                      ...values,
                                      categorysToFilter: [],
                                    });
                                  }
                                } else {
                                  onChangeCategories([q].map((q) => q.slug));
                                }
                                setBoolean(!boolean);
                              } else {
                                onChangeCategories([q].map((q) => q.slug));
                              }
                            }}
                            style={{
                              display: "flex",
                              textAlign: "centre",
                              justifyContent: "center",
                            }}
                            className=""
                          >
                            <section>
                              <Avatar
                                style={{ alignSelf: "right" }}
                                aria-label={"avatar icon"}
                                className={classes.avatar}
                              ></Avatar>
                              <span>{q.title}</span>
                            </section>
                          </div>
                        );
                      })}
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
