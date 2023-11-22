const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 64,
    },
    username: {
      type: String,
      max: 64,
      unique: true
    },
    public: {
      type: Boolean,
      default: false
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others']
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    subRole: {
      ref: "SubRole",
      type: mongoose.Schema.Types.ObjectId,
    },
    following: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          status: {
            type: String,
            enum: ["pending", "approved"],
          },
        },
      ],
      default: []
    },
    followers: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
          },
        },
      ],
      default: []
    },
    callsheetAccess: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
          },
        },
      ],
      default: []
    },
    callsheetRequest: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          status: {
            type: String,
            enum: ["pending", "approved"],
          },
        },
      ],
      default: []
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phoneno: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 10,
    },
    password: {
      type: String,
    },
    code: {
      type: Number,
    },
    dob: {
      type: String,
    },
    aboutyou: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    timings: [
      {
        start: Date,
        end: Date,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    selfiePhoto: {
      type: String,
    },
    selfieVerificationStatus: {
      type: String,
      enum: ["none", "pending", "accepted", "rejected"],
      default: "none",
    },
    photos: {
      type: Array,
    },
    coverPhoto: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    videos: {
      type: Array,
    },
    audios: {
      type: Array,
    },
    awards: [
      {
        photos: {
          type: Array,
        },
        title: {
          type: String,
        },
        year: {
          type: String,
        },
        reason: {
          type: String,
        },
      },
    ],
    movies: [
      {
        name: {
          type: String,
        },
        year: {
          type: String,
        },
        zones: {
          type: String,
        },
        role: {
          type: String,
        },
        director: {
          type: String,
        },
        coStar: {
          type: String,
        },
        moviePhoto: {
          type: Array,
        }
      },
    ],
    webSeries: [
      {
        name: {
          type: String,
        },
        ott: {
          type: String,
        },
        year: {
          type: String,
        },
        zones: {
          type: String,
        },
        role: {
          type: String,
        },
        director: {
          type: String,
        },
        webSeriesPhoto: {
          type: Array,
        }
      },
    ],
    misc: [
      {
        stageArtist: {
          type: String,
        },
        culturalProgram: {
          type: String,
        },
        year: {
          type: String,
        },
        role: {
          type: String,
        }
      },
    ],
    previousWork: {
      type: Array,
    },
    facebookLink: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    mailLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
    websiteLink: {
      type: String,
    },
    calendlyLink: {
      type: String,
    },
    accessToken: { type: String },
    deleteRequestedAt: { type: Date },
    resetPasswordToken: { type: Number, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);