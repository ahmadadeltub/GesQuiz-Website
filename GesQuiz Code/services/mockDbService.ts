import { User, UserRole, Class, Quiz, Assignment, NewQuestion, QuizAttempt, NewQuiz, QuestionType, Organization, Notification, AnswerRecord } from '../types';

const DB_KEYS = {
  ORGANIZATIONS: 'gestures_quiz_organizations',
  USERS: 'gestures_quiz_users',
  CLASSES: 'gestures_quiz_classes',
  QUIZZES: 'gestures_quiz_quizzes',
  ASSIGNMENTS: 'gestures_quiz_assignments',
  ATTEMPTS: 'gestures_quiz_attempts',
  STUDENT_ARCHIVES: 'gestures_quiz_student_archives',
  NOTIFICATIONS: 'gestures_quiz_notifications',
  DB_VERSION: 'gesquiz_db_version',
};

type StoredUser = User & { password?: string };
type StudentArchive = { studentId: string; quizId: string };


const initializeDB = () => {
  // By checking for a version key, we can force a data refresh when we change the seed data.
  if (localStorage.getItem(DB_KEYS.DB_VERSION) !== 'v4') {
    // Clear all previous data to ensure a clean slate
    Object.values(DB_KEYS).forEach(key => localStorage.removeItem(key));
    
    // --- Define IDs for new data ---
    const HAMDAN_ORG_ID = 'org-hamdan';
    const HAMDAN_SUPER_ADMIN_ID = 'super-admin-hamdan';
    const HAMDAN_ADMIN_ID = 'admin-hamdan';
    const HAMDAN_TEACHER_IDS = ['teacher-hamdan-1', 'teacher-hamdan-2', 'teacher-hamdan-3'];
    const HAMDAN_STUDENT_IDS = ['student-hamdan-1', 'student-hamdan-2', 'student-hamdan-3', 'student-hamdan-4', 'student-hamdan-5', 'student-hamdan-6'];
    const HAMDAN_CLASS_IDS = ['class-hamdan-1', 'class-hamdan-2', 'class-hamdan-3', 'class-hamdan-4', 'class-hamdan-5'];

    // 1. Organization
    const sampleOrganizations: Organization[] = [
      { id: HAMDAN_ORG_ID, name: 'Hamdan School', code: 'HAMDAN', status: 'approved', website:'www.hamdanschool.edu', mobile:'+971501234567', address:'123 Dubai St', country:'United Arab Emirates' },
    ];

    // 2. Users
    const sampleUsers: StoredUser[] = [
      // Super Admin
      { id: HAMDAN_SUPER_ADMIN_ID, email: 'superhamdan@gesquiz.edu', password: 'pass123456', role: UserRole.SUPER_ADMIN, firstName: 'Super', middleName:'', lastName: 'Hamdan'},
      // Admin
      { id: HAMDAN_ADMIN_ID, email: 'Hamdanschool@gesquiz.edu', password: 'pass123456', role: UserRole.ADMIN, firstName: 'School', middleName: 'Admin', lastName: 'Manager', organizationId: HAMDAN_ORG_ID, lastActivity: Date.now() },
      // Teachers
      { id: HAMDAN_TEACHER_IDS[0], email: 'teacher1@gesquiz.edu', password: 'pass123456', role: UserRole.TEACHER, firstName: 'Ahmed', middleName: '', lastName: 'Al Farsi', organizationId: HAMDAN_ORG_ID, lastActivity: Date.now() },
      { id: HAMDAN_TEACHER_IDS[1], email: 'teacher2@gesquiz.edu', password: 'pass123456', role: UserRole.TEACHER, firstName: 'Fatima', middleName: '', lastName: 'Al Mansoori', organizationId: HAMDAN_ORG_ID, lastActivity: Date.now() },
      { id: HAMDAN_TEACHER_IDS[2], email: 'teacher3@gesquiz.edu', password: 'pass123456', role: UserRole.TEACHER, firstName: 'Yusuf', middleName: '', lastName: 'Khan', organizationId: HAMDAN_ORG_ID, lastActivity: Date.now() },
      // Students
      { id: HAMDAN_STUDENT_IDS[0], email: 'student1@gesquiz.edu', password: 'pass123456', role: UserRole.STUDENT, classIds: [HAMDAN_CLASS_IDS[0], HAMDAN_CLASS_IDS[1]], firstName: 'Omar', middleName: '', lastName: 'Hassan', organizationId: HAMDAN_ORG_ID, points: 0 },
      { id: HAMDAN_STUDENT_IDS[1], email: 'student2@gesquiz.edu', password: 'pass123456', role: UserRole.STUDENT, classIds: [HAMDAN_CLASS_IDS[0], HAMDAN_CLASS_IDS[1]], firstName: 'Layla', middleName: '', lastName: 'Mohamed', organizationId: HAMDAN_ORG_ID, points: 0 },
      { id: HAMDAN_STUDENT_IDS[2], email: 'student3@gesquiz.edu', password: 'pass123456', role: UserRole.STUDENT, classIds: [HAMDAN_CLASS_IDS[2], HAMDAN_CLASS_IDS[3]], firstName: 'Ali', middleName: '', lastName: 'Ibrahim', organizationId: HAMDAN_ORG_ID, points: 0 },
      { id: HAMDAN_STUDENT_IDS[3], email: 'student4@gesquiz.edu', password: 'pass123456', role: UserRole.STUDENT, classIds: [HAMDAN_CLASS_IDS[2], HAMDAN_CLASS_IDS[3]], firstName: 'Noor', middleName: '', lastName: 'Abdullah', organizationId: HAMDAN_ORG_ID, points: 0 },
      { id: HAMDAN_STUDENT_IDS[4], email: 'student5@gesquiz.edu', password: 'pass123456', role: UserRole.STUDENT, classIds: [HAMDAN_CLASS_IDS[4]], firstName: 'Hassan', middleName: '', lastName: 'Mahmoud', organizationId: HAMDAN_ORG_ID, points: 0 },
      { id: HAMDAN_STUDENT_IDS[5], email: 'student6@gesquiz.edu', password: 'pass123456', role: UserRole.STUDENT, classIds: [HAMDAN_CLASS_IDS[4]], firstName: 'Aisha', middleName: '', lastName: 'Said', organizationId: HAMDAN_ORG_ID, points: 0 },
    ];
    
    // 3. Classes
    const sampleClasses: Class[] = [
      { id: HAMDAN_CLASS_IDS[0], name: 'Grade 6 Math', teacherId: HAMDAN_TEACHER_IDS[0], code: 'G6-MATH', studentIds: [HAMDAN_STUDENT_IDS[0], HAMDAN_STUDENT_IDS[1]], organizationId: HAMDAN_ORG_ID },
      { id: HAMDAN_CLASS_IDS[1], name: 'Grade 6 Science', teacherId: HAMDAN_TEACHER_IDS[0], code: 'G6-SCI', studentIds: [HAMDAN_STUDENT_IDS[0], HAMDAN_STUDENT_IDS[1]], organizationId: HAMDAN_ORG_ID },
      { id: HAMDAN_CLASS_IDS[2], name: 'Grade 7 History', teacherId: HAMDAN_TEACHER_IDS[1], code: 'G7-HIST', studentIds: [HAMDAN_STUDENT_IDS[2], HAMDAN_STUDENT_IDS[3]], organizationId: HAMDAN_ORG_ID },
      { id: HAMDAN_CLASS_IDS[3], name: 'Grade 7 English', teacherId: HAMDAN_TEACHER_IDS[1], code: 'G7-ENG', studentIds: [HAMDAN_STUDENT_IDS[2], HAMDAN_STUDENT_IDS[3]], organizationId: HAMDAN_ORG_ID },
      { id: HAMDAN_CLASS_IDS[4], name: 'Grade 8 Art', teacherId: HAMDAN_TEACHER_IDS[2], code: 'G8-ART', studentIds: [HAMDAN_STUDENT_IDS[4], HAMDAN_STUDENT_IDS[5]], organizationId: HAMDAN_ORG_ID },
    ];
    
    // 4. Quizzes
    const sampleQuizzes: Quiz[] = [];
    const subjects = ['Algebra', 'Biology', 'World History', 'Literature', 'Geography', 'Physics', 'Chemistry', 'Art History', 'Music Theory', 'Computer Science'];
    let quizCounter = 1;
    HAMDAN_TEACHER_IDS.forEach(teacherId => {
        for(let i=0; i<8; i++){
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            const quizId = `quiz-hamdan-${quizCounter++}`;
            sampleQuizzes.push({
                id: quizId,
                teacherId: teacherId,
                organizationId: HAMDAN_ORG_ID,
                title: `${subject} Basics ${i+1}`,
                questions: [
                    { id: `${quizId}-q1`, questionText: `What is 2 + 2?`, type: QuestionType.MULTIPLE_CHOICE, options: ['3', '4', '5', '6'], correctAnswerIndex: 1 },
                    { id: `${quizId}-q2`, questionText: `Is the Earth flat?`, type: QuestionType.TRUE_FALSE, options: ['True', 'False'], correctAnswerIndex: 1 },
                ]
            });
        }
    });
    
    // 5. Assignments
    const sampleAssignments: Assignment[] = [];
    let assignmentCounter = 1;
    sampleClasses.forEach(c => {
        const teacherQuizzes = sampleQuizzes.filter(q => q.teacherId === c.teacherId);
        // Assign 2 quizzes for each class
        teacherQuizzes.slice(0, 2).forEach((quiz, i) => {
            sampleAssignments.push({
                id: `assign-hamdan-${assignmentCounter++}`,
                quizId: quiz.id,
                classId: c.id,
                availableFrom: Date.now() - (1000 * 60 * 60 * 24 * (i + 1)) // available 1 and 2 days ago
            });
        });
    });

    // 6. Attempts (Answers for students)
    const sampleAttempts: QuizAttempt[] = [];
    let attemptCounter = 1;
    sampleAssignments.forEach(assignment => {
        const classInfo = sampleClasses.find(c => c.id === assignment.classId);
        const quizInfo = sampleQuizzes.find(q => q.id === assignment.quizId);
        if (classInfo && quizInfo) {
            classInfo.studentIds.forEach(studentId => {
                const maxScore = quizInfo.questions.length;
                const score = Math.floor(Math.random() * (maxScore + 1));
                const student = sampleUsers.find(u => u.id === studentId)!;
                student.points = (student.points || 0) + score;

                sampleAttempts.push({
                    id: `attempt-hamdan-${attemptCounter++}`,
                    quizId: quizInfo.id,
                    studentId: studentId,
                    organizationId: HAMDAN_ORG_ID,
                    score: score,
                    maxScore: maxScore,
                    completedAt: Date.now() - (1000 * 60 * 60 * Math.random() * 24),
                    answers: quizInfo.questions.map(q => ({
                        questionId: q.id,
                        selectedAnswerIndex: Math.floor(Math.random() * (q.options?.length || 1)),
                        isCorrect: Math.random() > 0.4, // Random correctness
                    }))
                });
            });
        }
    });

    localStorage.setItem(DB_KEYS.ORGANIZATIONS, JSON.stringify(sampleOrganizations));
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(sampleUsers));
    localStorage.setItem(DB_KEYS.CLASSES, JSON.stringify(sampleClasses));
    localStorage.setItem(DB_KEYS.QUIZZES, JSON.stringify(sampleQuizzes));
    localStorage.setItem(DB_KEYS.ASSIGNMENTS, JSON.stringify(sampleAssignments));
    localStorage.setItem(DB_KEYS.ATTEMPTS, JSON.stringify(sampleAttempts));
    localStorage.setItem(DB_KEYS.STUDENT_ARCHIVES, JSON.stringify([]));
    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify([]));
    
    // Set the version key so this doesn't run again
    localStorage.setItem(DB_KEYS.DB_VERSION, 'v4');
  }
};

initializeDB();

const db = {
  get: <T,>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  set: <T,>(key: string, data: T[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },
};

const updateUserActivity = (userId: string) => {
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const userIndex = users.findIndex(u => u.id === userId);
    if(userIndex > -1) {
        users[userIndex].lastActivity = Date.now();
        db.set(DB_KEYS.USERS, users);
    }
};

// --- Notification Service ---
const createNotification = (data: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const notifications = db.get<Notification>(DB_KEYS.NOTIFICATIONS);
    const newNotification: Notification = {
        id: `notif-${Date.now()}-${Math.random()}`,
        ...data,
        isRead: false,
        createdAt: Date.now(),
    };
    db.set(DB_KEYS.NOTIFICATIONS, [newNotification, ...notifications]); // Prepend for chronological order
};


export const mockDbService = {
  // --- Notification Functions ---
  getNotificationsForUser: (userId: string): Notification[] => {
    return db.get<Notification>(DB_KEYS.NOTIFICATIONS).filter(n => n.userId === userId);
  },
  markNotificationAsRead: (notificationId: string, userId: string): void => {
    const notifications = db.get<Notification>(DB_KEYS.NOTIFICATIONS);
    const index = notifications.findIndex(n => n.id === notificationId && n.userId === userId);
    if (index > -1) {
        notifications[index].isRead = true;
        db.set(DB_KEYS.NOTIFICATIONS, notifications);
    }
  },
  markAllNotificationsAsRead: (userId: string): void => {
    const notifications = db.get<Notification>(DB_KEYS.NOTIFICATIONS);
    notifications.forEach(n => {
        if (n.userId === userId) {
            n.isRead = true;
        }
    });
    db.set(DB_KEYS.NOTIFICATIONS, notifications);
  },

  // --- SUPER ADMIN Functions ---
  getAllOrganizations: (): Organization[] => {
      return db.get<Organization>(DB_KEYS.ORGANIZATIONS);
  },
  getPendingOrganizations: (): Organization[] => {
      return db.get<Organization>(DB_KEYS.ORGANIZATIONS).filter(o => o.status === 'pending');
  },
  approveOrganization: (orgId: string): void => {
      const orgs = db.get<Organization>(DB_KEYS.ORGANIZATIONS);
      const orgIndex = orgs.findIndex(o => o.id === orgId);
      if (orgIndex > -1) {
          orgs[orgIndex].status = 'approved';
          db.set(DB_KEYS.ORGANIZATIONS, orgs);
           // Notify the admin who created the org
          const admin = db.get<User>(DB_KEYS.USERS).find(u => u.organizationId === orgId && u.role === UserRole.ADMIN);
          if (admin) {
              createNotification({
                  userId: admin.id,
                  title: 'Organization Approved!',
                  message: `Your organization "${orgs[orgIndex].name}" has been approved. You can now access your dashboard.`,
                  link: '/admin',
              });
          }
      }
  },
  rejectOrganization: (orgId: string): void => {
      const orgs = db.get<Organization>(DB_KEYS.ORGANIZATIONS);
      const orgIndex = orgs.findIndex(o => o.id === orgId);
      if (orgIndex > -1) {
          orgs[orgIndex].status = 'rejected';
          db.set(DB_KEYS.ORGANIZATIONS, orgs);
      }
  },
  deleteOrganization: (orgId: string): void => {
    // Get IDs of all items to be deleted
    const usersToDelete = db.get<StoredUser>(DB_KEYS.USERS).filter(u => u.organizationId === orgId);
    const userIdsToDelete = usersToDelete.map(u => u.id);
    const classesToDelete = db.get<Class>(DB_KEYS.CLASSES).filter(c => c.organizationId === orgId);
    const classIdsToDelete = classesToDelete.map(c => c.id);
    const quizzesToDelete = db.get<Quiz>(DB_KEYS.QUIZZES).filter(q => q.organizationId === orgId);
    const quizIdsToDelete = quizzesToDelete.map(q => q.id);

    // Filter main tables
    const updatedOrgs = db.get<Organization>(DB_KEYS.ORGANIZATIONS).filter(o => o.id !== orgId);
    const updatedUsers = db.get<StoredUser>(DB_KEYS.USERS).filter(u => u.organizationId !== orgId);
    const updatedClasses = db.get<Class>(DB_KEYS.CLASSES).filter(c => c.organizationId !== orgId);
    const updatedQuizzes = db.get<Quiz>(DB_KEYS.QUIZZES).filter(q => q.organizationId !== orgId);
    const updatedAttempts = db.get<QuizAttempt>(DB_KEYS.ATTEMPTS).filter(a => a.organizationId !== orgId);
    
    // Filter relational tables based on deleted IDs
    const updatedAssignments = db.get<Assignment>(DB_KEYS.ASSIGNMENTS).filter(a => 
        !classIdsToDelete.includes(a.classId) && !quizIdsToDelete.includes(a.quizId)
    );
    const updatedNotifications = db.get<Notification>(DB_KEYS.NOTIFICATIONS).filter(n => !userIdsToDelete.includes(n.userId));

    // Persist changes
    db.set(DB_KEYS.ORGANIZATIONS, updatedOrgs);
    db.set(DB_KEYS.USERS, updatedUsers);
    db.set(DB_KEYS.CLASSES, updatedClasses);
    db.set(DB_KEYS.QUIZZES, updatedQuizzes);
    db.set(DB_KEYS.ATTEMPTS, updatedAttempts);
    db.set(DB_KEYS.ASSIGNMENTS, updatedAssignments);
    db.set(DB_KEYS.NOTIFICATIONS, updatedNotifications);
  },

  // --- Organization Management ---
  createOrganization: (data: Omit<Organization, 'id' | 'code' | 'status'>): Organization => {
    const orgs = db.get<Organization>(DB_KEYS.ORGANIZATIONS);
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: data.name,
      website: data.website,
      mobile: data.mobile,
      address: data.address,
      country: data.country,
      status: 'pending', // New orgs are pending approval
      code: data.name.substring(0, 4).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase(),
    };
    db.set(DB_KEYS.ORGANIZATIONS, [...orgs, newOrg]);
    // Notify super admin
    const superAdmin = db.get<User>(DB_KEYS.USERS).find(u => u.role === UserRole.SUPER_ADMIN);
    if (superAdmin) {
        createNotification({
            userId: superAdmin.id,
            title: 'New Organization Pending',
            message: `"${newOrg.name}" has registered and is awaiting your approval.`,
            link: '/superadmin',
        });
    }
    return newOrg;
  },
  getOrganizationByCode: (code: string): Organization | undefined => {
    return db.get<Organization>(DB_KEYS.ORGANIZATIONS).find(o => o.code.toUpperCase() === code.toUpperCase() && o.status === 'approved');
  },
  getOrganizationById: (id: string): Organization | undefined => {
      return db.get<Organization>(DB_KEYS.ORGANIZATIONS).find(o => o.id === id);
  },

  // --- User Management ---
  verifyUser: (email: string, passwordInput: string): User | null => {
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const foundUser = users.find(u => u.email === email);
    if (foundUser && foundUser.password === passwordInput) {
      const { password, ...userToReturn } = foundUser;
      return userToReturn;
    }
    return null;
  },
  getUserByEmail: (email: string): StoredUser | undefined => {
    return db.get<StoredUser>(DB_KEYS.USERS).find(u => u.email === email);
  },
  getUserById: (id: string): User | undefined => {
    const foundUser = db.get<StoredUser>(DB_KEYS.USERS).find(u => u.id === id);
    if (foundUser) {
        const { password, ...userToReturn } = foundUser;
        return userToReturn;
    }
    return undefined;
  },
  createUser: (data: Omit<User, 'id'>, passwordInput: string): User => {
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const newUser: StoredUser = { 
        id: `user-${Date.now()}`, 
        ...data,
        password: passwordInput,
    };
    db.set<StoredUser>(DB_KEYS.USERS, [...users, newUser]);
    const { password, ...userToReturn } = newUser;
    return userToReturn;
  },

  // --- Teacher Functions ---
  getClassesByTeacher: (teacherId: string): Class[] => {
    const teacher = mockDbService.getUserById(teacherId);
    if (!teacher || !teacher.organizationId) return [];
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    return classes.filter(c => c.teacherId === teacherId && c.organizationId === teacher.organizationId && !c.isDeleted);
  },
  getQuizzesByTeacher: (teacherId: string): Quiz[] => {
    const teacher = mockDbService.getUserById(teacherId);
    if (!teacher || !teacher.organizationId) return [];
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    return quizzes.filter(q => q.teacherId === teacherId && q.organizationId === teacher.organizationId && !q.isDeleted);
  },
  createClass: (name: string, teacherId: string): Class => {
    const teacher = mockDbService.getUserById(teacherId);
    if (!teacher || !teacher.organizationId) throw new Error("Cannot create class: Teacher not found or not in an organization.");
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const newClass: Class = {
        id: `class-${Date.now()}`, name, teacherId,
        organizationId: teacher.organizationId,
        code: `${name.substring(0,4).toUpperCase()}-${Date.now().toString().slice(-4)}`,
        studentIds: [], isArchived: false, isDeleted: false,
    }
    db.set(DB_KEYS.CLASSES, [...classes, newClass]);
    updateUserActivity(teacherId);
    
    // Notify the Admin
    const admin = db.get<User>(DB_KEYS.USERS).find(u => u.organizationId === teacher?.organizationId && u.role === UserRole.ADMIN);
    if (admin && teacher) {
        createNotification({
            userId: admin.id,
            title: 'New Class Created',
            message: `${teacher.firstName} ${teacher.lastName} created a new class: "${newClass.name}".`,
            link: '/admin'
        });
    }
    
    return newClass;
  },
  createQuiz: (teacherId: string, title: string, questionsData: NewQuestion[]): Quiz => {
    const teacher = mockDbService.getUserById(teacherId);
    if (!teacher || !teacher.organizationId) throw new Error("Cannot create quiz: Teacher not found or not in an organization.");
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`, teacherId, title,
      organizationId: teacher.organizationId,
      questions: questionsData.map((q, i) => ({ ...q, id: `q-${Date.now()}-${i}` })),
      isArchived: false, isDeleted: false,
    };
    db.set(DB_KEYS.QUIZZES, [...quizzes, newQuiz]);
    updateUserActivity(teacherId);
    return newQuiz;
  },
  assignQuizToClass: (quizId: string, classId: string, availableFrom: number): Assignment | null => {
    const quiz = mockDbService.getQuizById(quizId);
    const classItem = mockDbService.getClassById(classId);
    if (!quiz || !classItem || quiz.organizationId !== classItem.organizationId) {
      console.error("Assignment Error: Quiz and Class are in different organizations.");
      return null;
    }
    const assignments = db.get<Assignment>(DB_KEYS.ASSIGNMENTS);
    if (assignments.find(a => a.quizId === quizId && a.classId === classId)) return null; // Already assigned
    const newAssignment: Assignment = { id: `assign-${Date.now()}`, quizId, classId, availableFrom };
    db.set(DB_KEYS.ASSIGNMENTS, [...assignments, newAssignment]);

    // Notify students in the class
    classItem.studentIds.forEach(studentId => {
        createNotification({
            userId: studentId,
            title: 'New Quiz Assigned!',
            message: `A new quiz, "${quiz.title}", has been assigned to your class "${classItem.name}".`,
            link: '/student',
        });
    });

    // Notify the Admin
    const admin = db.get<User>(DB_KEYS.USERS).find(u => u.organizationId === quiz.organizationId && u.role === UserRole.ADMIN);
    const teacher = mockDbService.getUserById(quiz.teacherId);
    if (admin && teacher) {
        createNotification({
            userId: admin.id,
            title: 'New Quiz Assigned',
            message: `${teacher.firstName} ${teacher.lastName} assigned "${quiz.title}" to "${classItem.name}".`,
            link: '/admin'
        });
    }

    return newAssignment;
  },

  // --- Student Functions ---
  joinClass: (code: string, studentId: string): { class: Class | null; error?: string } => {
    const student = mockDbService.getUserById(studentId);
    if (!student || !student.organizationId) return { class: null, error: "Your user profile could not be found." };
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const classToJoin = classes.find(c => c.code.toUpperCase() === code.toUpperCase() && !c.isArchived && !c.isDeleted);
    if (!classToJoin) return { class: null, error: "Invalid or archived class code." };
    if (classToJoin.organizationId !== student.organizationId) {
      return { class: null, error: "This class code belongs to a different organization." };
    }
    
    if (!classToJoin.studentIds.includes(studentId)) {
        classToJoin.studentIds.push(studentId);
        db.set(DB_KEYS.CLASSES, classes);
        // Notify the teacher
        const teacher = mockDbService.getUserById(classToJoin.teacherId);
        if (teacher) {
            createNotification({
                userId: teacher.id,
                title: 'New Student Joined Class',
                message: `${student.firstName} ${student.lastName} has joined your class "${classToJoin.name}".`,
                link: '/teacher',
            });
        }
    }
    const studentRecord = users.find(u => u.id === studentId);
    if (studentRecord) {
      if (!studentRecord.classIds?.includes(classToJoin.id)) {
          studentRecord.classIds = [...(studentRecord.classIds || []), classToJoin.id];
          db.set(DB_KEYS.USERS, users);
      }
    }
    return { class: classToJoin };
  },
  getQuizzesForStudent: (studentId: string): { quiz: Quiz, assignment: Assignment }[] => {
    const student = mockDbService.getUserById(studentId);
    if (!student || !student.classIds || !student.organizationId) return [];
    const assignments = db.get<Assignment>(DB_KEYS.ASSIGNMENTS);
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const relevantAssignments = assignments.filter(a => student.classIds!.includes(a.classId));
    const studentQuizzes = relevantAssignments.map(assignment => {
        const quiz = quizzes.find(q => q.id === assignment.quizId && !q.isArchived && !q.isDeleted && q.organizationId === student.organizationId);
        return quiz ? { quiz, assignment } : null;
    }).filter((item): item is { quiz: Quiz; assignment: Assignment } => item !== null);
    return studentQuizzes;
  },

  // --- Admin Functions (Scoped to Organization) ---
  getSystemStats: (organizationId: string) => {
    const users = db.get<User>(DB_KEYS.USERS).filter(u => u.organizationId === organizationId);
    const classes = db.get<Class>(DB_KEYS.CLASSES).filter(c => c.organizationId === organizationId);
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES).filter(q => q.organizationId === organizationId);
    return {
      totalTeachers: users.filter(u => u.role === UserRole.TEACHER).length,
      totalStudents: users.filter(u => u.role === UserRole.STUDENT).length,
      totalClasses: classes.length,
      totalQuizzes: quizzes.length,
    }
  },
  getAllClasses: (organizationId: string): Class[] => {
    return db.get<Class>(DB_KEYS.CLASSES).filter(c => c.organizationId === organizationId);
  },
  getAllQuizzes: (organizationId: string): Quiz[] => {
    return db.get<Quiz>(DB_KEYS.QUIZZES).filter(q => q.organizationId === organizationId);
  },
  getAllUsers: (organizationId: string): User[] => {
    return db.get<StoredUser>(DB_KEYS.USERS)
      .filter(u => u.organizationId === organizationId)
      .map(u => { const { password, ...user } = u; return user; });
  },
  getAllAttempts: (organizationId: string): QuizAttempt[] => {
    return db.get<QuizAttempt>(DB_KEYS.ATTEMPTS).filter(a => a.organizationId === organizationId);
  },
  
  // --- Unscoped/Helper Functions ---
  getQuizById: (quizId: string): Quiz | undefined => {
    return db.get<Quiz>(DB_KEYS.QUIZZES).find(q => q.id === quizId);
  },
  getClassById: (classId: string): Class | undefined => {
      return db.get<Class>(DB_KEYS.CLASSES).find(c => c.id === classId);
  },

  // --- Functions below this line are mostly unchanged but adapted where needed ---
  // ... (the rest of the functions from the original file, adapted for org if necessary)
  
  getAssignmentsByClass: (classId: string): Assignment[] => db.get<Assignment>(DB_KEYS.ASSIGNMENTS).filter(a => a.classId === classId),
  getAssignmentsByQuiz: (quizId: string): Assignment[] => db.get<Assignment>(DB_KEYS.ASSIGNMENTS).filter(a => a.quizId === quizId),
  getClassesByIds: (ids: string[]): Class[] => db.get<Class>(DB_KEYS.CLASSES).filter(c => ids.includes(c.id)),
  getStudentsByClassId: (classId: string): User[] => {
      const targetClass = db.get<Class>(DB_KEYS.CLASSES).find(c => c.id === classId);
      if (!targetClass) return [];
      const allUsers = db.get<User>(DB_KEYS.USERS);
      return allUsers.filter(u => targetClass.studentIds.includes(u.id));
  },
  addStudentsToClassFromCSV: (classId: string, studentsData: { firstName: string; lastName: string; email: string; middleName: string; }[]): { added: number; skipped: number; errors: string[] } => {
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const classToUpdate = classes.find(c => c.id === classId);

    if (!classToUpdate) {
        return { added: 0, skipped: 0, errors: ['Class not found.'] };
    }

    const allUsers = db.get<StoredUser>(DB_KEYS.USERS);
    
    let added = 0;
    let skipped = 0;
    const errors: string[] = [];

    studentsData.forEach(studentInfo => {
        if (!studentInfo.email || !studentInfo.firstName || !studentInfo.lastName) {
            errors.push(`Skipping row with missing data: ${JSON.stringify(studentInfo)}`);
            return;
        }

        let studentUser = allUsers.find(u => u.email.toLowerCase() === studentInfo.email.toLowerCase());

        // If user doesn't exist, create them.
        if (!studentUser) {
            const newUser: StoredUser = {
                id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
                email: studentInfo.email,
                password: 'password', // Default password for CSV import
                role: UserRole.STUDENT,
                firstName: studentInfo.firstName,
                middleName: studentInfo.middleName,
                lastName: studentInfo.lastName,
                organizationId: classToUpdate.organizationId,
                classIds: [],
                points: 0,
            };
            allUsers.push(newUser);
            studentUser = newUser;
        }
        
        if (studentUser.role !== UserRole.STUDENT) {
            errors.push(`User with email ${studentInfo.email} is not a student.`);
            return;
        }
        
        if (studentUser.organizationId !== classToUpdate.organizationId) {
            errors.push(`Student ${studentInfo.email} belongs to a different organization.`);
            return;
        }

        // Add student to class if not already there.
        if (!classToUpdate.studentIds.includes(studentUser.id)) {
            classToUpdate.studentIds.push(studentUser.id);
            added++;
            
            if (!studentUser.classIds) {
                studentUser.classIds = [];
            }
            if (!studentUser.classIds.includes(classId)) {
                studentUser.classIds.push(classId);
            }
        } else {
            skipped++;
        }
    });

    db.set(DB_KEYS.USERS, allUsers);
    db.set(DB_KEYS.CLASSES, classes);

    updateUserActivity(classToUpdate.teacherId);
    
    return { added, skipped, errors };
  },
  updateClass: (classId: string, newName: string): Class | null => {
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const classIndex = classes.findIndex(c => c.id === classId);
    if (classIndex > -1) {
        classes[classIndex].name = newName;
        db.set(DB_KEYS.CLASSES, classes);
        updateUserActivity(classes[classIndex].teacherId);
        return classes[classIndex];
    }
    return null;
  },
  updateQuiz: (quizId: string, updatedData: { title: string; questions: NewQuestion[] }): Quiz | null => {
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const quizIndex = quizzes.findIndex(q => q.id === quizId);
    if (quizIndex > -1) {
        quizzes[quizIndex].title = updatedData.title;
        quizzes[quizIndex].questions = updatedData.questions.map((q, index) => ({
            ...q,
            id: quizzes[quizIndex].questions[index]?.id || `q-${Date.now()}-${index}`,
        }));
        db.set(DB_KEYS.QUIZZES, quizzes);
        updateUserActivity(quizzes[quizIndex].teacherId);
        return quizzes[quizIndex];
    }
    return null;
  },
  duplicateQuiz: (quizId: string): Quiz | null => {
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const originalQuiz = quizzes.find(q => q.id === quizId);
    if (!originalQuiz) return null;
    const newQuiz: Quiz = {
        ...originalQuiz,
        id: `quiz-${Date.now()}`,
        title: `Copy of ${originalQuiz.title}`,
        isArchived: false,
    };
    db.set(DB_KEYS.QUIZZES, [...quizzes, newQuiz]);
    updateUserActivity(newQuiz.teacherId);
    return newQuiz;
  },
  archiveClass: (classId: string, archive: boolean): void => {
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const classIndex = classes.findIndex(c => c.id === classId);
    if (classIndex > -1) { classes[classIndex].isArchived = archive; db.set(DB_KEYS.CLASSES, classes); }
  },
  archiveQuiz: (quizId: string, archive: boolean): void => {
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const quizIndex = quizzes.findIndex(q => q.id === quizId);
    if (quizIndex > -1) { quizzes[quizIndex].isArchived = archive; db.set(DB_KEYS.QUIZZES, quizzes); }
  },
  deleteClass: (classId: string): void => {
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const classIndex = classes.findIndex(c => c.id === classId);
    if (classIndex > -1) { classes[classIndex].isDeleted = true; db.set(DB_KEYS.CLASSES, classes); }
  },
  deleteQuiz: (quizId: string): void => {
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const quizIndex = quizzes.findIndex(q => q.id === quizId);
    if (quizIndex > -1) { quizzes[quizIndex].isDeleted = true; db.set(DB_KEYS.QUIZZES, quizzes); }
  },
  restoreClass: (classId: string): void => {
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const classIndex = classes.findIndex(c => c.id === classId);
    if (classIndex > -1) { classes[classIndex].isDeleted = false; db.set(DB_KEYS.CLASSES, classes); }
  },
  restoreQuiz: (quizId: string): void => {
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const quizIndex = quizzes.findIndex(q => q.id === quizId);
    if (quizIndex > -1) { quizzes[quizIndex].isDeleted = false; db.set(DB_KEYS.QUIZZES, quizzes); }
  },
  permanentlyDeleteClass: (classId: string): void => {
    db.set(DB_KEYS.CLASSES, db.get<Class>(DB_KEYS.CLASSES).filter(c => c.id !== classId));
    db.set(DB_KEYS.ASSIGNMENTS, db.get<Assignment>(DB_KEYS.ASSIGNMENTS).filter(a => a.classId !== classId));
  },
  permanentlyDeleteQuiz: (quizId: string): void => {
    db.set(DB_KEYS.QUIZZES, db.get<Quiz>(DB_KEYS.QUIZZES).filter(q => q.id !== quizId));
    db.set(DB_KEYS.ASSIGNMENTS, db.get<Assignment>(DB_KEYS.ASSIGNMENTS).filter(a => a.quizId !== quizId));
    db.set(DB_KEYS.ATTEMPTS, db.get<QuizAttempt>(DB_KEYS.ATTEMPTS).filter(a => a.quizId !== quizId));
  },
  getDeletedContent: (teacherId: string): { deletedClasses: Class[], deletedQuizzes: Quiz[] } => {
    const teacher = mockDbService.getUserById(teacherId);
    if (!teacher || !teacher.organizationId) return { deletedClasses: [], deletedQuizzes: [] };
    const allQuizzes = db.get<Quiz>(DB_KEYS.QUIZZES).filter(q => q.organizationId === teacher.organizationId && q.teacherId === teacherId && q.isDeleted);
    const allClass = db.get<Class>(DB_KEYS.CLASSES).filter(c => c.organizationId === teacher.organizationId && c.teacherId === teacherId && c.isDeleted);
    return { deletedClasses: allClass, deletedQuizzes: allQuizzes };
  },
  emptyRecycleBin: (teacherId: string): void => {
    const { deletedClasses, deletedQuizzes } = mockDbService.getDeletedContent(teacherId);
    deletedClasses.forEach(c => mockDbService.permanentlyDeleteClass(c.id));
    deletedQuizzes.forEach(q => mockDbService.permanentlyDeleteQuiz(q.id));
  },
  toggleArchiveForStudent: (studentId: string, quizId: string): void => {
    const archives = db.get<StudentArchive>(DB_KEYS.STUDENT_ARCHIVES);
    const archiveIndex = archives.findIndex(a => a.studentId === studentId && a.quizId === quizId);
    if (archiveIndex > -1) archives.splice(archiveIndex, 1);
    else archives.push({ studentId, quizId });
    db.set(DB_KEYS.STUDENT_ARCHIVES, archives);
  },
  getStudentArchivedQuizIds: (studentId: string): string[] => {
    return db.get<StudentArchive>(DB_KEYS.STUDENT_ARCHIVES).filter(a => a.studentId === studentId).map(a => a.quizId);
  },
  saveQuizAttempt: (attemptData: Omit<QuizAttempt, 'id' | 'organizationId' | 'score' | 'maxScore'>): void => {
    const student = mockDbService.getUserById(attemptData.studentId);
    if (!student || !student.organizationId) throw new Error("Student not found for saving attempt");

    const quiz = mockDbService.getQuizById(attemptData.quizId);
    if (!quiz) throw new Error("Quiz not found");
    
    let totalScore = 0;
    let maxScore = 0;

    quiz.questions.forEach(question => {
        const answer = attemptData.answers.find(a => a.questionId === question.id);
        if (question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.TRUE_FALSE) {
            maxScore += 1;
            if (answer?.isCorrect) {
                totalScore += 1;
            }
        } else if (question.type === QuestionType.DRAG_AND_DROP) {
            const itemsLength = question.items?.length || 0;
            maxScore += itemsLength;
            if (answer?.mapping && question.correctMapping) {
                let correctMatches = 0;
                for (const itemIndex in question.correctMapping) {
                    if (Number(question.correctMapping[itemIndex]) === Number(answer.mapping[itemIndex])) {
                        correctMatches++;
                    }
                }
                totalScore += correctMatches;
            }
        }
    });

    const attempts = db.get<QuizAttempt>(DB_KEYS.ATTEMPTS);
    const newAttempt: QuizAttempt = { 
        ...attemptData, 
        id: `attempt-${Date.now()}`, 
        organizationId: student.organizationId,
        score: totalScore,
        maxScore: maxScore,
    };
    db.set(DB_KEYS.ATTEMPTS, [...attempts, newAttempt]);
    
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const studentIndex = users.findIndex(u => u.id === attemptData.studentId);
    if(studentIndex > -1) {
        // Points for leaderboard are the points earned in this quiz
        users[studentIndex].points = (users[studentIndex].points || 0) + totalScore;
        db.set(DB_KEYS.USERS, users);
    }
     // Notify the teacher
    if (quiz && student) {
        createNotification({
            userId: quiz.teacherId,
            title: 'Quiz Submitted',
            message: `${student.firstName} ${student.lastName} has completed the quiz "${quiz.title}".`,
            link: '/teacher'
        });
    }
  },
  getAttemptsByStudent: (studentId: string): QuizAttempt[] => db.get<QuizAttempt>(DB_KEYS.ATTEMPTS).filter(a => a.studentId === studentId),
  getAttemptsByQuiz: (quizId: string): QuizAttempt[] => db.get<QuizAttempt>(DB_KEYS.ATTEMPTS).filter(a => a.quizId === quizId),
  getAttemptById: (attemptId: string): QuizAttempt | undefined => db.get<QuizAttempt>(DB_KEYS.ATTEMPTS).find(a => a.id === attemptId),

  // ADMIN - SYSTEM WIDE (but now scoped)
  updateClassTeacher: (classId: string, newTeacherId: string): Class | null => {
      const classes = db.get<Class>(DB_KEYS.CLASSES);
      const classIndex = classes.findIndex(c => c.id === classId);
      if (classIndex > -1) {
          classes[classIndex].teacherId = newTeacherId;
          db.set(DB_KEYS.CLASSES, classes);
          return classes[classIndex];
      }
      return null;
  },
  addStudentToClass: (classId: string, studentId: string): boolean => {
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const classToUpdate = classes.find(c => c.id === classId);
    const studentToAdd = users.find(u => u.id === studentId);
    if (!classToUpdate || !studentToAdd || studentToAdd.role !== UserRole.STUDENT) { return false; }
    if (!classToUpdate.studentIds.includes(studentId)) {
        classToUpdate.studentIds.push(studentId);
        if (!studentToAdd.classIds) studentToAdd.classIds = [];
        if (!studentToAdd.classIds.includes(classId)) { studentToAdd.classIds.push(classId); }
        db.set(DB_KEYS.CLASSES, classes);
        db.set(DB_KEYS.USERS, users);
        return true;
    }
    return false;
  },
  removeStudentFromClass: (classId: string, studentId: string): boolean => {
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const classToUpdate = classes.find(c => c.id === classId);
    const studentToRemove = users.find(u => u.id === studentId);
    if (!classToUpdate || !studentToRemove) { return false; }
    const studentIndexInClass = classToUpdate.studentIds.indexOf(studentId);
    if (studentIndexInClass > -1) {
        classToUpdate.studentIds.splice(studentIndexInClass, 1);
        if (studentToRemove.classIds) {
            const classIndexInStudent = studentToRemove.classIds.indexOf(classId);
            if (classIndexInStudent > -1) { studentToRemove.classIds.splice(classIndexInStudent, 1); }
        }
        db.set(DB_KEYS.CLASSES, classes);
        db.set(DB_KEYS.USERS, users);
        return true;
    }
    return false;
  },
  getSystemWideDeletedContent: (organizationId: string): { deletedClasses: Class[], deletedQuizzes: Quiz[] } => {
    const allQuizzes = db.get<Quiz>(DB_KEYS.QUIZZES);
    const allClass = db.get<Class>(DB_KEYS.CLASSES);
    const deletedQuizzes = allQuizzes.filter(q => q.organizationId === organizationId && q.isDeleted);
    const deletedClasses = allClass.filter(c => c.organizationId === organizationId && c.isDeleted);
    return { deletedClasses, deletedQuizzes };
  },
  emptySystemWideRecycleBin: (organizationId: string): void => {
    const { deletedClasses, deletedQuizzes } = mockDbService.getSystemWideDeletedContent(organizationId);
    deletedClasses.forEach(c => mockDbService.permanentlyDeleteClass(c.id));
    deletedQuizzes.forEach(q => mockDbService.permanentlyDeleteQuiz(q.id));
  },
  deleteUser: (userIdToDelete: string, performingAdminId: string): { success: boolean; message: string } => {
    const users = db.get<StoredUser>(DB_KEYS.USERS);
    const classes = db.get<Class>(DB_KEYS.CLASSES);
    const quizzes = db.get<Quiz>(DB_KEYS.QUIZZES);

    const userToDelete = users.find(u => u.id === userIdToDelete);
    const performingAdmin = users.find(u => u.id === performingAdminId);

    if (!userToDelete) {
        return { success: false, message: "User not found." };
    }
    if (!performingAdmin || performingAdmin.role !== UserRole.ADMIN) {
        return { success: false, message: "Invalid admin credentials." };
    }

    // Safeguards
    if (userToDelete.id === performingAdminId) {
        return { success: false, message: "Admins cannot delete their own account." };
    }
    if (userToDelete.role === UserRole.ADMIN) {
        return { success: false, message: "Admins cannot delete other admin accounts." };
    }

    if (userToDelete.role === UserRole.TEACHER) {
        const hasActiveContent = 
            classes.some(c => c.teacherId === userIdToDelete && !c.isDeleted && !c.isArchived) ||
            quizzes.some(q => q.teacherId === userIdToDelete && !q.isDeleted && !q.isArchived);
        
        if (hasActiveContent) {
            return { success: false, message: "Cannot delete teacher. They are assigned to active (non-archived) classes or quizzes. Please reassign or delete the content first." };
        }
    }

    if (userToDelete.role === UserRole.STUDENT) {
        // Remove from all classes
        const updatedClasses = classes.map(c => {
            if (c.studentIds.includes(userIdToDelete)) {
                c.studentIds = c.studentIds.filter(id => id !== userIdToDelete);
            }
            return c;
        });
        db.set(DB_KEYS.CLASSES, updatedClasses);
        
        // Delete all their attempts
        const attempts = db.get<QuizAttempt>(DB_KEYS.ATTEMPTS);
        const updatedAttempts = attempts.filter(a => a.studentId !== userIdToDelete);
        db.set(DB_KEYS.ATTEMPTS, updatedAttempts);
    }
    
    // Finally, delete the user
    const updatedUsers = users.filter(u => u.id !== userIdToDelete);
    db.set(DB_KEYS.USERS, updatedUsers);
    
    return { success: true, message: `User ${userToDelete.firstName} ${userToDelete.lastName} has been permanently deleted.` };
  },
};