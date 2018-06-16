const users = [{
    id: 1,
    name: 'Me',
    schoolId: 101
}, {
    id: 2,
    name: 'Jim',
    schoolId: 108748984
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 108748984,
    grade: 100
}, {
    id: 3,
    schoolId: 101,
    grade: 56
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of: ${id}.`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    })
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tUser) => {
        user = tUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let ave = 0;

        if (grades.length > 0) {
            ave = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${ave}% in the class.`;
    });
};

// set as a special function for async / await

// const getStatusAlt = async(userId) => {
//     throw new Error('This is an error.');
//     return "Mike";
// };

const getStatusAlt = async(userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    let ave = 0;

    if (grades.length > 0) {
        ave = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${ave}% in the class.`;
};

// getUser(2).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e);
// });


// getUser(1).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e);
// });

// getUser(100).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e);
// });


// getGrades(101).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//     console.log(e);
// });

// getGrades(108748984).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//     console.log(e);
// });

// getGrades(100).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//     console.log(e);
// });


// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// getStatus(2).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// getStatus(100).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// console.log(getStatusAlt());

// getStatusAlt().then((name) => {
//     console.log(name);
// }).catch((e) => {
//     console.log(e);
// });


getStatusAlt(1).then((name) => {
    console.log(name);
}).catch((e) => {
    console.log(e);
});