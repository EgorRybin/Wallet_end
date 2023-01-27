const { Model: Transaction } = require('../../models').transactions;
const { Model: User } = require('../../models').users;
const { Model: Category } = require('../../models').category;

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const category = (await Category.findById(req.body.category))._id;

  // var2
  const user = await User.findById(owner);

  const balanceAfter = req.body.type ? (user.balance + Number(req.body.sum)) : (user.balance - Number(req.body.sum));

  await User.findByIdAndUpdate(owner, {balance: balanceAfter});
  
  const transaction = await Transaction.create({ ...req.body, category, owner, balanceAfter });




  // var1
  // const transaction = await Transaction.create({ ...req.body, category, owner, balanceAfter: 0 });
  // const transactions = await Transaction.find({owner}).sort({date: 1, updatedAt: 1});

  // const transIndex = [...transactions].findIndex(it => it._id.toString() === transaction._id.toString());

  // const addedArr = transactions.slice(transIndex);
  // const lastRightBalance = transactions[transIndex - 1].balanceAfter;
  // const result = [...addedArr].reduce((acc, it) => {
  //   it.balanceAfter = acc.balance + (it.type ? 1 : -1) * it.sum;
  //   acc.balance = it.balanceAfter;
  //   acc.collection.push(it);

  //   return {
  //     collection: acc.collection,
  //     balance: it.balanceAfter
  //   };
  // }, {collection: [], balance: lastRightBalance})
  // await Transaction.create(...result.collection);

  // console.log(addedArr);
  // const newCollections = await Transaction
  //   .find({owner}, 'updatedAt createdAt sum balanceAfter date type')
  //   .populate("category", "-createdAt -updatedAt")
  //   .sort({date: 1, updatedAt: 1});

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      transaction,
      // transactions: newCollections,
      // newArr,
    },
  });
};

module.exports = add;
