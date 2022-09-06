const models = require("../models");
const { Op } = require("sequelize");
class userReqController {
  //===========adding usersReq to the database==============

  //creating a new userReq
  //received a friend request
  //accepted a friend request
  //cancelled a friend request
  //deleted a friend request
  //followers list by user model
  //============creating a new userReq==========================

  async createfriendReq(req, res) {
    try {
      const { userId, friendId } = req.body;
      if (!userId || !friendId) {
        throw new Error("userId and friendId are required");
      }

      const userData = await models.user.findOne({
        where: {
          id: userId,
        },
      });

      if (!userData) {
        throw "user not found";
      }

      const userFriendData = await models.user.findOne({
        where: {
          id: friendId,
        },
      });

      if (!userFriendData) {
        throw "user not found";
      }

      const existedUserReq = await models.UserReq.findOne({
        request_id: userId,
        receiver_id: friendId,
      });

      if (existedUserReq) {
        if (existedUserReq.status === "pending") {
          throw "Request already sent";
        }

        if (existedUserReq.status === "accepted") {
          throw "This user is already your friend";
        }

        if (existedUserReq.status === "rejected") {
          throw "Your request has been rejected";
        }
      }

      const userReq = await models.UserReq.create({
        request_id: userId,
        receiver_id: friendId,
        status: "pending",
        is_connected: false,
        is_friend: false,
      });

      res.status(200).json({
        status: 200,
        message: "friend request sent",
        userReq,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error,
        message: "Something went wrong",
      });
    }
  }

  //============req Received list from receiver==========================

  async reqReceivedList(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          status: 400,
          error: "id is required",
        });
      }
      const userReqs = await models.UserReq.findAndCountAll({
        where: {
          receiver_id: id,
          status: "pending",
        },
        include: [
          {
            model: models.user,
            attributes: ["id", "email", "first_name", "last_name"],
            as: "request_user",
          },
        ],
      });
      if (userReqs.count === 0) {
        return res.status(400).json({
          status: 400,
          error: "No friend request found",
        });
      }
      res.status(200).json({
        status: 200,
        message: "friend request found",
        data: userReqs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        error: error,
        message: "Something went wrong",
      });
    }
  }

  //============req Send list from sender==========================

  async reqSendList(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          status: 400,
          error: "id is required",
        });
      }
      const userReqs = await models.UserReq.findAll({
        where: {
          request_id: id,
          status: "pending",
        },
        include: [
          {
            model: models.user,
            attributes: ["email", "first_name", "last_name"],
            as: "receiver_user",
          },
        ],
      });
      if (!userReqs) {
        return res.status(400).json({
          status: 400,
          error: "No friend request found",
        });
      }
      res.status(200).json({
        status: 200,
        message: "friend request found",
        userReqs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        error: error,
        message: "Something went wrong",
      });
    }
  }

  //============cancelled a friend request==========================
  async cancelReq(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          status: 400,
          error: "id is required",
        });
      }

      const userReq = await models.UserReq.destroy({
        where: {
          id: id,
          status: "pending",
        },
      });

      res.status(200).json({
        status: 200,
        message: "friend request cancelled",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        error: error,
        message: "Something went wrong",
      });
    }
  }

  //============accept a friend request==========================
  async acceptOrreject(req, res) {
    try {
      const { req_id, rec_id, status } = req.params;

      if (!req_id || !rec_id || !status) {
        return res.status(400).json({
          status: 400,
          error: "id is required",
        });
      }
      if (status !== "accepted" || status !== "rejected") {
        throw new Error("status must be accepted or rejected");
      }
      await models.UserReq.update(
        {
          status: status,
          is_connected: status === "accepted" ? true : false,
          is_friend: status === "accepted" ? true : false,
        },
        {
          where: {
            request_id: req_id,
            receiver_id: rec_id,
          },
        }
      );
      await models.UserReq.update(
        {
          status: status,
          is_connected: status === "accepted" ? true : false,
          is_friend: status === "accepted" ? true : false,
        },
        {
          where: {
            request_id: rec_id,
            receiver_id: req_id,
          },
        }
      );
      res.status(200).json({
        status: 200,
        message: "friend request accepted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        error: error,
        message: "Something went wrong",
      });
    }
  }

  //============reject a friend request==========================
  // async rejectReq(req, res) {
  //   try {
  //     const { req_id, rec_id } = req.params;

  //     if (!req_id || !rec_id) {
  //       return res.status(400).json({
  //         status: 400,
  //         error: "id is required",
  //       });
  //     }
  //     await models.UserReq.update(
  //       {
  //         status: "rejected",
  //         is_connected: false,
  //         is_friend: false,
  //       },
  //       {
  //         where: {
  //           request_id: req_id,
  //           receiver_id: rec_id,
  //         },
  //       }
  //     );
  //     await models.UserReq.update(
  //       {
  //         status: "rejected",
  //         is_connected: false,
  //         is_friend: false,
  //       },
  //       {
  //         where: {
  //           request_id: rec_id,
  //           receiver_id: req_id,
  //         },
  //       }
  //     );
  //     res.status(200).json({
  //       status: 200,
  //       message: "friend request rejected Done",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({
  //       status: 500,
  //       error: error,
  //       message: "Something went wrong",
  //     });
  //   }
  // }

  //============list all the user from user data==========================

  //============list all the user from user data==========================
  async Userfollowers(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          status: 400,
          error: "id is required",
        });
      }
      const userReqs = await models.user.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: models.UserReq,
            as: "receiver_user",
            where: {
              [Op.and]: [
                {
                  status: "accepted",
                },
                {
                  is_connected: true,
                },
                {
                  is_friend: true,
                },
              ],
            },
            include: [
              {
                model: models.user,
                required: false,
                attributes: ["email", "first_name", "last_name"],
                as: "request_user",
              },
            ],
          },
        ],
      });

      if (!userReqs) {
        return res.status(400).json({
          status: 400,
          error: "No friends found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "friend request found",
        data: userReqs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        error: error,
        message: "Something went wrong",
      });
    }
  }
}
module.exports = new userReqController();
