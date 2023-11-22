const User = require("../models/user");
const formidable = require("formidable");
const { getSearchRegexp } = require("../utils/getSearchRegex");
require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs")
const mongoose = require('mongoose');

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
});

exports.updateTimings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newTiming = req.body.timing;

    const user = await User.findByIdAndUpdate(userId, {
      $push: { timings: newTiming },
    });
    if (!user) {
      return res.json({
        message: "Something went wrong!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User Timings updated successfully",
        user: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    let form = await new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.json({
          error: error.message,
        });
      }
      const { photos, videos, audios, awards, previousWorks } = files;

      const updateFields = {};

      // handle profile photos
      if (photos) {
        if (Array.isArray(photos)) {
          const photosPromises = photos.map((photo, index) => {
            const photoKey = `users/${id}/photos_${Date.now()}_${index + 1}_${photo.originalFilename
              }`;

            const photoParams = {
              Bucket: "photoscallsheet",
              Key: photoKey,
              Body: "",
            };

            return s3.upload(photoParams).promise();
          });

          Promise.all(photosPromises)
            .then((results) => {
              updateFields.photos = results.map((data) => data.Location);

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile photos:", err);
              updateProfile();
            });
        } else {
          const photo = photos;
          const photoKey = `users/${id}/photos_${Date.now()}_${photo.originalFilename
            }`;

          const photoParams = {
            Bucket: "photoscallsheet",
            Key: photoKey,
            Body: "",
          };

          s3.upload(photoParams)
            .promise()
            .then((data) => {
              updateFields.photos = [data.Location];

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile photos:", err);
              updateProfile();
            });
        }
      }

      // handle profile videos
      if (videos) {
        if (Array.isArray(videos)) {
          const videosPromises = videos.map((photo, index) => {
            const photoKey = `users/${id}/videos_${Date.now()}_${index + 1}_${photo.originalFilename
              }`;

            const photoParams = {
              Bucket: "videoscallsheet",
              Key: photoKey,
              Body: "",
            };

            return s3.upload(photoParams).promise();
          });

          Promise.all(videosPromises)
            .then((results) => {
              updateFields.videos = results.map((data) => data.Location);

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile videos:", err);
              updateProfile();
            });
        } else {
          const photo = videos;
          const photoKey = `users/${id}/videos_${Date.now()}_${photo.originalFilename
            }`;

          const photoParams = {
            Bucket: "videoscallsheet",
            Key: photoKey,
            Body: "",
          };

          s3.upload(photoParams)
            .promise()
            .then((data) => {
              updateFields.videos = [data.Location];

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile videos:", err);
              updateProfile();
            });
        }
      }

      // handle profile audios
      if (audios) {
        if (Array.isArray(audios)) {
          const audiosPromises = audios.map((photo, index) => {
            const photoKey = `users/${id}/audios_${Date.now()}_${index + 1}_${photo.originalFilename
              }`;

            const photoParams = {
              Bucket: "audioscallsheet",
              Key: photoKey,
              Body: "",
            };

            return s3.upload(photoParams).promise();
          });

          Promise.all(audiosPromises)
            .then((results) => {
              updateFields.audios = results.map((data) => data.Location);

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile audios:", err);
              updateProfile();
            });
        } else {
          const photo = audios;
          const photoKey = `users/${id}/audios_${Date.now()}_${photo.originalFilename
            }`;

          const photoParams = {
            Bucket: "audioscallsheet",
            Key: photoKey,
            Body: "",
          };

          s3.upload(photoParams)
            .promise()
            .then((data) => {
              updateFields.audios = [data.Location];

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile audios:", err);
              updateProfile();
            });
        }
      }

      // handle profile awards
      if (awards) {
        if (Array.isArray(awards)) {
          const awardsPromises = awards.map((photo, index) => {
            const photoKey = `users/${id}/awards_${Date.now()}_${index + 1}_${photo.originalFilename
              }`;

            const photoParams = {
              Bucket: "awardscallsheet",
              Key: photoKey,
              Body: "",
            };

            return s3.upload(photoParams).promise();
          });

          Promise.all(awardsPromises)
            .then((results) => {
              updateFields.awards = results.map((data) => data.Location);

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile awards:", err);
              updateProfile();
            });
        } else {
          const photo = awards;
          const photoKey = `users/${id}/awards_${Date.now()}_${photo.originalFilename
            }`;

          const photoParams = {
            Bucket: "awardscallsheet",
            Key: photoKey,
            Body: "",
          };

          s3.upload(photoParams)
            .promise()
            .then((data) => {
              updateFields.awards = [data.Location];

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile awards:", err);
              updateProfile();
            });
        }
      }

      // handle profile previousWorks
      if (previousWorks) {
        if (Array.isArray(previousWorks)) {
          const previousWorksPromises = previousWorks.map((photo, index) => {
            const photoKey = `users/${id}/previousWorks_${Date.now()}_${index + 1
              }_${photo.originalFilename}`;

            const photoParams = {
              Bucket: "previousworkcallsheet",
              Key: photoKey,
              Body: "",
            };

            return s3.upload(photoParams).promise();
          });

          Promise.all(previousWorksPromises)
            .then((results) => {
              updateFields.previousWorks = results.map((data) => data.Location);

              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile previousWorks:", err);
              updateProfile();
            });
        } else {
          const photo = previousWorks;
          const photoKey = `users/${id}/previousWorks_${Date.now()}_${photo.originalFilename
            }`;

          const photoParams = {
            Bucket: "previousworkcallsheet",
            Key: photoKey,
            Body: "",
          };

          s3.upload(photoParams)
            .promise()
            .then((data) => {
              updateFields.previousWorks = [data.Location];
              // Continue updating other fields
              updateProfile();
            })
            .catch((err) => {
              console.log("Error uploading profile previous works:", err);
              updateProfile();
            });
        }
      }
      async function updateProfile() {
        // Update other fields in the MongoDB user document
        const updatedUser = await User.findByIdAndUpdate(
          id,
          {
            $set: {
              ...fields,
              ...updateFields,
            },
          },
          { new: true }
        );
        if (updatedUser) {
          res.json({
            success: true,
            updatedUser,
          });
        } else {
          res.json({
            success: false,
            error: "Error while updating user",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

//get All search or sort
exports.getAll = async (req, res) => {
  try {
    let { search, column, order, block } = req.query;

    let searchFilter = {};
    if (search) {
      searchFilter = {
        ...searchFilter,
        name: { $regex: search, $options: "i" } // Perform a case-insensitive partial text search
      };
    }
    if (block) {
      searchFilter = {
        ...searchFilter,
        status: block
      };
    }

    const sorting = [];
    sorting.push(["name", order || "ASC"]);

    const count = await User.countDocuments(searchFilter); // Use countDocuments instead of count
    let rows = await User.find(searchFilter)
      .sort(sorting)
      .select("name _id profilePhoto");

    res.json({ count, rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get User By Id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, filter } = req.query;

    const user = await User.findById(userId).populate('role').populate('subRole')
    const self = await User.findById(id).populate('role').populate('subRole')

    if (id === userId) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      if (user.public === true) {
        res.status(200).json({
          success: true,
          user,
        });
      } else {
        const exists = self.following.filter((follow) =>  follow.userId.equals(new mongoose.Types.ObjectId(userId)));

        if (exists.length>0 && exists[0].status==='approved') {

          if (user.photos.length > 0) {
            user.photos.slice(0, 4)
          }
          if (user.videos.length > 0) {
            user.videos.slice(0, 4)
          }
          if (user.awards.length > 0) {
            user.awards.slice(0, 4)
          }
          if (user.movies.length > 0) {
            user.movies.slice(0, 4)
          }
          if (user.webSeries.length > 0) {
            user.webSeries.slice(0, 4)
          }
          if (user.audios.length > 0) {
            user.audios.slice(0, 4)
          }
          if (user.misc.length > 0) {
            user.misc.slice(0, 4)
          }

          if (filter) {

            let data = user[filter]

            res.status(200).json({
              success: true,
              data
            });
          } else {
            res.status(200).json({
              success: true,
              user,
            });
          }

        } else {
          res.status(400).json({
            success: false,
            message: "You are not permitted to access details of this user",
            data: {
              name: user.name ? user.name : "",
              username: user.username ? user.username : "",
              profilePic: user.profilePic ? user.profilePic : "",
              aboutYou: user.aboutYou ? user.aboutYou : "",
              role: user.role ? user.role.name ? user.role.name : "" : "",
            }
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSeperateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, filter } = req.query;

    const user = await User.findById(userId)
    const self = await User.findById(id)

    var data = {}

    if (filter === "photos") {
      data.photos = user.photos ? user.photos : []
    }
    else if (filter === "videos") {
      data.videos = user.videos ? user.videos : []
    }
    else if (filter === "awards") {
      data.awards = user.awards ? user.awards : []
    }
    else if (filter === "movies") {
      data.movies = user.movies ? user.movies : []
    }
    else if (filter === "webSeries") {
      data.webSeries = user.webSeries ? user.webSeries : []
    }
    else if (filter === "audios") {
      data.audios = user.audios ? user.audios : []
    }
    else if (filter === "misc") {
      data.misc = user.misc ? user.misc : []
    }

    if (id === userId) {
      res.status(200).json({
        success: true,
        data,
      });
    } else {
      if (user.public === true) {
        res.status(200).json({
          success: true,
          data,
        });
      } else {
        const exists = self.following.some((follow) => follow.userId === id);

        if (exists) {

          res.status(200).json({
            success: true,
            data
          })
        } else {
          res.status(400).json({
            success: false,
            message: "You are not permitted to access details of this user"
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fileUpload = async (req, res) => {
  try {
    let form = await new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.json({
          error: error.message,
        });
      }
      const { file } = files;
      const { type } = fields;
      var updateField;
      if (type === "photos" && file) {
        if (Array.isArray(file)) {
          const photosPromises = file.map((photo, index) => {
            const photoKey = `users/${id}/photos_${Date.now()}_${index + 1}_${photo.originalFilename
              }`;

              const base64Data = fs.createReadStream(photo.filepath);

              const photoParams = {
                Bucket: "photoscallsheet",
                Key: photoKey,
                Body: base64Data
              };

            return s3.upload(photoParams).promise();
          });

          Promise.all(photosPromises)
            .then((results) => {
              updateField = results.map((data) => data.Location);

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile photos:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        } else {
          const photo = file;
          const photoKey = `users/photos_${Date.now()}_${photo.originalFilename
            }`;

            const base64Data = fs.createReadStream(photo.filepath);

            const photoParams = {
              Bucket: "photoscallsheet",
              Key: photoKey,
              Body: base64Data
            };

          s3.upload(photoParams)
            .promise()
            .then((data) => {
              updateField = [data.Location];

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile photos:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        }
      } else if (type === "videos" && file) {
        if (Array.isArray(file)) {
          const videosPromises = file.map((video, index) => {
            const videoKey = `users/videos_${Date.now()}_${index + 1}_${video.originalFilename
              }`;

            const videoParams = {
              Bucket: "videoscallsheet",
              Key: videoKey,
              Body: "",
            };

            return s3.upload(videoParams).promise();
          });

          Promise.all(videosPromises)
            .then((results) => {
              updateField = results.map((data) => data.Location);

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile videos:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        } else {
          const video = file;
          const videoKey = `users/videos_${Date.now()}_${video.originalFilename
            }`;

          const videoParams = {
            Bucket: "videoscallsheet",
            Key: videoKey,
            Body: "",
          };

          s3.upload(videoParams)
            .promise()
            .then((data) => {
              updateField = [data.Location];

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile videos:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        }
      } else if (type === "audios" && file) {
        if (Array.isArray(file)) {
          const audiosPromises = file.map((audio, index) => {
            const audioKey = `users/audios_${Date.now()}_${index + 1}_${audio.originalFilename
              }`;

            const audioParams = {
              Bucket: "audioscallsheet",
              Key: audioKey,
              Body: "",
            };

            return s3.upload(audioParams).promise();
          });

          Promise.all(audiosPromises)
            .then((results) => {
              updateField = results.map((data) => data.Location);

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile audios:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        } else {
          const audio = file;
          const audioKey = `users/audios_${Date.now()}_${audio.originalFilename
            }`;

          const audioParams = {
            Bucket: "audioscallsheet",
            Key: audioKey,
            Body: "",
          };

          s3.upload(audioParams)
            .promise()
            .then((data) => {
              updateField = [data.Location];

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile audios:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        }
      } else if (type === "awards" && file) {
        if (Array.isArray(file)) {
          const awardsPromises = file.map((award, index) => {
            const awardKey = `users/awards_${Date.now()}_${index + 1}_${award.originalFilename
              }`;

              const base64Data = fs.createReadStream(award.filepath);

              const awardParams = {
                Bucket: "awardscallsheet",
                Key: awardKey,
                Body: base64Data
              };

            return s3.upload(awardParams).promise();
          });

          Promise.all(awardsPromises)
            .then((results) => {
              updateField = results.map((data) => data.Location);

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile awards:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        } else {
          const award = file;
          const awardKey = `users/awards_${Date.now()}_${award.originalFilename
            }`;

            const base64Data = fs.createReadStream(award.filepath);

            const awardParams = {
              Bucket: "awardscallsheet",
              Key: awardKey,
              Body: base64Data
            };

          s3.upload(awardParams)
            .promise()
            .then((data) => {
              updateField = [data.Location];

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile awards:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        }
      } else if (type === "previousWorks" && file) {
        if (Array.isArray(file)) {
          const previousWorksPromises = file.map((previousWork, index) => {
            const previousWorkKey = `users/previousWorks_${Date.now()}_${index + 1
              }_${previousWork.originalFilename}`;

              const base64Data = fs.createReadStream(previousWork.filepath);

              const previousWorkParams = {
                Bucket: "previousworkscallsheet",
                Key: previousWorkKey,
                Body: base64Data
              };

            return s3.upload(previousWorkParams).promise();
          });

          Promise.all(previousWorksPromises)
            .then((results) => {
              updateField = results.map((data) => data.Location);

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile previousWorks:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        } else {
          const previousWork = file;
          const previousWorkKey = `users/previousWorks_${Date.now()}_${previousWork.originalFilename
            }`;

            const base64Data = fs.createReadStream(previousWork.filepath);

            const previousWorkParams = {
              Bucket: "previousworkscallsheet",
              Key: previousWorkKey,
              Body: base64Data
            };

          s3.upload(previousWorkParams)
            .promise()
            .then((data) => {
              updateField = [data.Location];

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile previousWorks:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        }
      } else if (type === "coverPhoto" && file) {
        const coverPhoto = file;
        const coverPhotoKey = `users/coverPhotos_${Date.now()}_${coverPhoto.originalFilename
          }`;

          const base64Data = fs.createReadStream(coverPhoto.filepath);

          const coverPhotoParams = {
            Bucket: "coverphotocallsheet",
            Key: coverPhotoKey,
            Body: base64Data
          };

        s3.upload(coverPhotoParams)
          .promise()
          .then((data) => {
            updateField = [data.Location];

            // Continue updating other fields
            return res.status(200).json({
              success: true,
              status: 200,
              fileType: type,
              location: updateField,
            });
          })
          .catch((err) => {
            console.log("Error uploading profile coverPhotos:", err);
            return res.status(500).json({
              success: false,
              status: 500,
              error: err.message,
            });
          });
      } else if (type === "profilePhoto" && file) {
        const profilePhoto = file;
        const profilePhotoKey = `users/profilePhotos_${Date.now()}_${profilePhoto.originalFilename
          }`;

          const base64Data = fs.createReadStream(profilePhoto.filepath);

          const profilePhotoParams = {
            Bucket: "profilephotocallsheet",
            Key: profilePhotoKey,
            Body: base64Data
          };

        s3.upload(profilePhotoParams)
          .promise()
          .then((data) => {
            updateField = [data.Location];

            // Continue updating other fields
            return res.status(200).json({
              success: true,
              status: 200,
              fileType: type,
              location: updateField,
            });
          })
          .catch((err) => {
            console.log("Error uploading profile profilePhotos:", err);
            return res.status(500).json({
              success: false,
              status: 500,
              error: err.message,
            });
          });
      } else if (type === "movies" && file) {
        if (Array.isArray(file)) {
          const moviesPromises = file.map((movie, index) => {
            const movieKey = `users/movies_${Date.now()}_${index + 1}_${movie.originalFilename
              }`;

              const base64Data = fs.createReadStream(movie.filepath);

              const movieParams = {
                Bucket: "moviescallsheet",
                Key: movieKey,
                Body: base64Data
              };

            return s3.upload(movieParams).promise();
          });

          Promise.all(moviesPromises)
            .then((results) => {
              updateField = results.map((data) => data.Location);

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile movies:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        } else {
          const movie = file;
          const movieKey = `users/movies_${Date.now()}_${movie.originalFilename
            }`;

            const base64Data = fs.createReadStream(movie.filepath);

            const movieParams = {
              Bucket: "moviescallsheet",
              Key: movieKey,
              Body: base64Data
            };

          s3.upload(movieParams)
            .promise()
            .then((data) => {
              updateField = [data.Location];

              // Continue updating other fields
              return res.status(200).json({
                success: true,
                status: 200,
                fileType: type,
                location: updateField,
              });
            })
            .catch((err) => {
              console.log("Error uploading profile movies:", err);
              return res.status(500).json({
                success: false,
                status: 500,
                error: err.message,
              });
            });
        }
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          error: "File not found",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

// update profile

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    if (updatedUser) {
      res.json({
        success: true,
        updatedUser,
      });
    } else {
      res.json({
        success: false,
        error: "Error while updating user",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

// Delete a file

exports.deleteFile = async (req, res) => {
  try {
    const id = req.params.id;
    const { typeOfFile, url } = req.body;
    const user = await User.findById(id);

    if (Object.keys(user.toObject()).includes(typeOfFile)) {
      if (Array.isArray(user[typeOfFile])) {
        // const dataDel = await deleteFileFromS3(typeOfFile, url);

        var updateQuery = {};

        if (typeOfFile === "photos") {
          updateQuery = { $pull: { photos: url } };
        } else if (typeOfFile === "videos") {
          updateQuery = { $pull: { videos: url } };
        } else if (typeOfFile === "audios") {
          updateQuery = { $pull: { audios: url } };
        } else if (typeOfFile === "videos") {
          updateQuery = { $pull: { videos: url } };
        } else if (typeOfFile === "previousWorks") {
          updateQuery = { $pull: { previousWorks: url } };
        }

        const newUser = await User.findByIdAndUpdate(id, updateQuery, {
          new: true,
        });

        return res.status(200).json({
          success: true,
          status: 200,
          message: "File deleted successfully",
          fileDeleted: newUser,
        });
      } else {
        if (typeOfFile === "coverPhoto") {
          updateQuery = { $pull: { coverPhoto: url } };
        }
        const newUser = await User.findByIdAndUpdate(id, updateQuery, {
          new: true,
        });

        return res.status(200).json({
          success: true,
          status: 200,
          message: "File deleted successfully",
          fileDeleted: newUser,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Type of file is incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.selfieVerification = async (req, res) => {
  try {
    let form = await new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.json({
          error: error.message,
        });
      }
      const { selfiePhoto } = files;
      var updateField;

      const selfiePhotoKey = `users/${fields.id}/photos_${Date.now()}_${selfiePhoto.originalFilename}`;

      const base64Data = fs.createReadStream(selfiePhoto.filepath);

      const selfiePhotoParams = {
        Bucket: "photoscallsheet",
        Key: selfiePhotoKey,
        Body: base64Data
      };

      s3.upload(selfiePhotoParams)
        .promise()
        .then(async (data) => {
          updateField = data.Location;
          const updatedUser = await User.findByIdAndUpdate(
            fields.id,
            {
              $set: {
                selfiePhoto: updateField,
                selfieVerificationStatus: "pending",
              },
            },
            { new: true }
          );
          if (updatedUser) {
            res.json({
              success: true,
              status: 200,
              message:
                "Selfie for Verification sent successfully. You will be notified once you are verified.",
            });
          } else {
            res.json({
              success: false,
              error: "Error while updating user",
            });
          }
        })
        .catch((err) => {
          console.log("Error uploading profile awards:", err);
        });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.accountDeleteRequest = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.deleteRequestedAt) {
      return res
        .status(400)
        .json({ message: "Account deletion already requested" });
    }

    user.deleteRequestedAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Account deletion requested",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.deactivateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "User not found",
      });
    }
    user.status = "inactive";
    await user.save();
    return res.status(200).json({
      success: true,
      status: 200,
      user,
      message: "User deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    const followedUser = await User.findById(userId);

    var followingData = {};
    var followerData = {};

    if (!followedUser) {
      return res.json({
        success: false,
        error: "User not found",
      });
    }

    if (!user.following) {
      user.following = [];
    }

    const exists = user.following.some((follow) => follow.userId.equals(new mongoose.Types.ObjectId(userId)));

    if (!exists) {
      if (followedUser.public === true) {
        followingData.userId = userId;
        followingData.status = "approved";
      } else {
        followingData.userId = userId;
        followingData.status = "pending";
      }
      user.following.push(followingData);
    } else {
      if(exists.status==='rejected') {
        user.following.forEach((follow) => {
          if(follow.userId.equals(new mongoose.Types.ObjectId(userId))) {
            follow.status='pending'
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'You already follow this user',
        });
      }
    }

    if (!followedUser.followers) {
      followedUser.followers = [];
    }

    const followedExists = followedUser.followers.some((follow) => follow.userId.equals(new mongoose.Types.ObjectId(id)));

    if (!followedExists) {
      if (followedUser.public === true) {
        followerData.userId = id;
        followerData.status = "approved";
      } else {
        followerData.userId = id;
        followerData.status = "pending";
      }
      followedUser.followers.push(followerData);
      console.log(followedUser.followers);
    } else {
      if(exists.status==='rejected') {
        followedUser.followers.forEach((follow) => {
          if(follow.userId.equals(new mongoose.Types.ObjectId(id))) {
            follow.status='pending'
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'You already follow this user',
        });
      }
    }

    const updatedUser = await user.save();
    await followedUser.save();

    res.json({
      success: true,
      message: `${followerData.status === 'approved' ? "You have successfully followed this user" : "Follow request sent successfully"}`,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};


exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    const followedUser = await User.findById(userId);

    if (!followedUser) {
      return res.json({
        success: false,
        error: "User not found",
      });
    }

    if (!user.following) {
      user.following = [];
    }

    const exists = user.following.filter((follow) => follow.userId.equals(new mongoose.Types.ObjectId(userId)));

    if (exists.length===0) {
      user.following = user.following.filter((follow) => !follow.userId.equals(new mongoose.Types.ObjectId(userId)));
    } else {
      return res.json({
        success: false,
        message: 'You are not following this user',
      });
    }

    if (!followedUser.followers) {
      followedUser.followers = [];
    }

    const followedExists = followedUser.followers.some((follow) => follow.userId.equals(new mongoose.Types.ObjectId(id)));

    if (followedExists.length===0) {
      followedUser.followers = followedUser.followers.filter((follow) => !follow.userId.equals(new mongoose.Types.ObjectId(id)));
    } else {
      return res.json({
        success: true,
        message: 'You are not following this user',
      });
    }

    const updatedUser = await user.save();
    await followedUser.save();

    res.json({
      success: true,
      message: 'You have successfully unfollowed this user',
      updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};


exports.followStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    const followingUser = await User.findById(userId);

    if (!user.callsheetRequest) {
      return res.json({
        success: false,
        message: 'No follow requests yet',
      });
    }

    if (status === 'accept') {
      followingUser.following.forEach((follow, index) => {
        if (follow.userId.equals(new mongoose.Types.ObjectId(id))) {
          follow.status = 'approved';
        }
      });
      user.followers.forEach((follow, index) => {
        if (follow.userId.equals(new mongoose.Types.ObjectId(userId))) {
          follow.status = 'approved';
        }
      });
    } else if (status === 'reject') {
      followingUser.following = user.following.filter((follow) => !follow.userId.equals(new mongoose.Types.ObjectId(id)));
      user.followers = followingUser.followers.filter((follow) => !follow.userId.equals(new mongoose.Types.ObjectId(userId)));
    } else {
      return res.json({
        success: false,
        message: 'Invalid status',
      });
    }

    await user.save();
    await followingUser.save();

    res.json({
      success: true,
      message: `Follow request ${status}ed`,
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.publicPrivate = async (req, res) => {
  try {

    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.json({
        success: false,
        message: 'User not found',
      });
    }

    let status = user.public;

    await User.findByIdAndUpdate(req.params.id, { public: !status })

    res.json({
      success: true,
      message: `Your account is now ${status === true ? 'Private' : 'Public'}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.callsheetAccess = async (req, res) => {
  try {
    const { userId } = req.body;
    const {id} = req.params;

    const user = await User.findById(id);

    const followedUser = await User.findById(userId);

    if (!followedUser) {
      return res.json({
        success: false,
        error: "User not found",
      });
    }

    if (!user.callsheetAccess) {
      user.callsheetAccess = [];
    }

    const exists = user.callsheetAccess.filter((follow) => follow.userId.equals(new mongoose.Types.ObjectId(userId)));

    console.log(exists);

    if (exists.length===0) {
        user.callsheetAccess.push({ userId: userId, status: 'pending' });
    }
    else {
      if(exists.status==='rejected') {
        user.callsheetAccess.forEach((follow) => {
          if(follow.userId.equals(new mongoose.Types.ObjectId(userId))) {
            follow.status='pending'
          }
        });
      } else {
        console.log('1111111');
        return res.json({
          success: false,
          message: 'You already sent access request',
        });
      }
    }

    if (!followedUser.callsheetRequest) {
      user.callsheetRequest = [];
    }

    const followedExists = followedUser.callsheetRequest.filter((follow) => follow.userId.equals(new mongoose.Types.ObjectId(id)));

    if (followedExists.length===0) {
      followedUser.callsheetRequest.push({ userId: id, status: 'pending' });
    }
    else {
      if(followedExists.status==='rejected') {
        followedUser.callsheetRequest.forEach((follow) => {
          if(follow.userId.equals(new mongoose.Types.ObjectId(id))) {
            follow.status='pending'
          }
        });
      } else {
        console.log('2222222');
        res.json({
          success: false,
          message: 'You already sent access request',
        });
      }
    }

    const updatedUser = await user.save();
    await followedUser.save();

    res.json({
      success: true,
      message: 'Callsheet request sent successfully',
      updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.callsheetAccessStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    const followingUser = await User.findById(userId);

    if (!user.callsheetRequest) {
      return res.json({
        success: false,
        message: 'No callsheet requests yet',
      });
    }

    if (status === 'accept') {
      followingUser.callsheetAccess.forEach((follow, index) => {
        if (follow.userId.equals(new mongoose.Types.ObjectId(id))) {
          follow.status = 'approved';
        }
      });
      user.callsheetRequest.forEach((follow, index) => {
        if (follow.userId.equals(new mongoose.Types.ObjectId(userId))) {
          follow.status = 'approved';
        }
      });
    } else if (status === 'reject') {
      followingUser.callsheetAccess = user.callsheetAccess.filter((follow) => !follow.userId.equals(new mongoose.Types.ObjectId(id)));
      user.callsheetRequest = followingUser.callsheetRequest.filter((follow) => !follow.userId.equals(new mongoose.Types.ObjectId(userId)));
    } else {
      return res.json({
        success: false,
        message: 'Invalid status',
      });
    }

    await user.save();
    await followingUser.save();

    res.json({
      success: true,
      message: `Callsheet request ${status}ed`,
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (
      (!user.callsheetRequest || user.callsheetRequest.length === 0) &&
      (!user.followers || user.followers.length === 0)
    ) {
      return res.json({
        success: false,
        message: 'No requests yet',
      });
    }

    let response = {
      callsheet: [],
      followers: []
    };

    let hasPendingCallsheet = false;
    let hasPendingFollowers = false;

    user.callsheetRequest.forEach((x) => {
      if (x.status === 'pending') {
        response.callsheet.push(x);
        hasPendingCallsheet = true;
      }
    });

    user.followers.forEach((x) => {
      if (x.status === 'pending') {
        response.followers.push(x);
        hasPendingFollowers = true;
      }
    });

    if (hasPendingCallsheet || hasPendingFollowers) {
      res.json({
        success: true,
        message: 'Requests successfully fetched',
        response
      });
    } else {
      return res.json({
        success: false,
        message: 'No requests yet',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

