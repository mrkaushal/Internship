CREATE TABLE Worker (
	WORKER_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	FIRST_NAME CHAR(25),
	LAST_NAME CHAR(25),
	SALARY INT(15),
	JOINING_DATE DATETIME,
	DEPARTMENT CHAR(25)
);

INSERT INTO Worker 
	(WORKER_ID, FIRST_NAME, LAST_NAME, SALARY, JOINING_DATE, DEPARTMENT) VALUES
		(001, 'Monika', 'Arora', 100000, '14-02-20 09.00.00', 'HR'),
		(002, 'Niharika', 'Verma', 80000, '14-06-11 09.00.00', 'Admin'),
		(003, 'Vishal', 'Singhal', 300000, '14-02-20 09.00.00', 'HR'),
		(004, 'Amitabh', 'Singh', 500000, '14-02-20 09.00.00', 'Admin'),
		(005, 'Vivek', 'Bhati', 500000, '14-06-11 09.00.00', 'Admin'),
		(006, 'Vipul', 'Diwan', 200000, '14-06-11 09.00.00', 'Account'),
		(007, 'Satish', 'Kumar', 75000, '14-01-20 09.00.00', 'Account'),
		(008, 'Geetika', 'Chauhan', 90000, '14-04-11 09.00.00', 'Admin');

CREATE TABLE Bonus (
	WORKER_REF_ID INT,
	BONUS_AMOUNT INT(10),
	BONUS_DATE DATETIME,
	FOREIGN KEY (WORKER_REF_ID)
		REFERENCES Worker(WORKER_ID)
        ON DELETE CASCADE
);

INSERT INTO Bonus 
	(WORKER_REF_ID, BONUS_AMOUNT, BONUS_DATE) VALUES
		(001, 5000, '16-02-20'),
		(002, 3000, '16-06-11'),
		(003, 4000, '16-02-20'),
		(001, 4500, '16-02-20'),
		(002, 3500, '16-06-11');
    
CREATE TABLE Title (
	WORKER_REF_ID INT,
	WORKER_TITLE CHAR(25),
	AFFECTED_FROM DATETIME,
	FOREIGN KEY (WORKER_REF_ID)
		REFERENCES Worker(WORKER_ID)
        ON DELETE CASCADE
);

INSERT INTO Title 
(WORKER_REF_ID, WORKER_TITLE, AFFECTED_FROM) VALUES
 (001, 'Manager', '2016-02-20 00:00:00'),
 (002, 'Executive', '2016-06-11 00:00:00'),
 (008, 'Executive', '2016-06-11 00:00:00'),
 (005, 'Manager', '2016-06-11 00:00:00'),
 (004, 'Asst. Manager', '2016-06-11 00:00:00'),
 (007, 'Executive', '2016-06-11 00:00:00'),
 (006, 'Lead', '2016-06-11 00:00:00'),
 (003, 'Lead', '2016-06-11 00:00:00');


Q1
SELECT FIRST_NAME AS WORKER_NAME FROM worker;
Q2
SELECT UPPER(First_Name) FROM worker;
Q3
SELECT Distinct(Department) FROM worker;
Q4
SELECT substr(First_Name, 1, 3) FROM worker;
Q5
Select INSTR(FIRST_NAME, BINARY'a') from Worker where FIRST_NAME = 'Amitabh';
Q6
Select RTRIM(FIRST_NAME) from Worker;
Q7
Select LTRIM(DEPARTMENT) from Worker;
Q8
Select distinct length(DEPARTMENT) from Worker;
Q9
Select REPLACE(FIRST_NAME,'a','A') from Worker;
Q10
Select CONCAT(FIRST_NAME, ' ', LAST_NAME) AS 'COMPLETE_NAME' from Worker;
Q11
Select * from Worker order by FIRST_NAME asc;
Q12
Select * from Worker order by FIRST_NAME asc,DEPARTMENT desc;
Q13
Select * from Worker where FIRST_NAME in ('Vipul','Satish');
Q14
Select * from Worker where FIRST_NAME not in ('Vipul','Satish');
Q15
Select * from Worker where DEPARTMENT='Admin';
Q16
Select * from Worker where FIRST_NAME like '%a%';
Q17
Select * from Worker where FIRST_NAME like '%a';
Q18
Select * from Worker where FIRST_NAME like '_____h';
Q19
Select * from Worker where SALARY between 100000 and 500000;
Q20
Select * from Worker where year(JOINING_DATE) = 2014 and month(JOINING_DATE) = 2;
Q21
SELECT COUNT(*) FROM worker WHERE DEPARTMENT = 'Admin';
Q22
SELECT CONCAT(FIRST_NAME, ' ', LAST_NAME) As Worker_Name, Salary
FROM worker 
WHERE WORKER_ID IN 
(SELECT WORKER_ID FROM worker 
WHERE Salary BETWEEN 50000 AND 100000);
Q23
SELECT DEPARTMENT, count(WORKER_ID) No_Of_Workers 
FROM worker 
GROUP BY DEPARTMENT 
ORDER BY No_Of_Workers DESC;
Q24
SELECT DISTINCT W.FIRST_NAME, T.WORKER_TITLE
FROM Worker W
INNER JOIN Title T
ON W.WORKER_ID = T.WORKER_REF_ID
AND T.WORKER_TITLE in ('Manager');
Q25
SELECT WORKER_TITLE, AFFECTED_FROM, COUNT(*)
FROM Title
GROUP BY WORKER_TITLE, AFFECTED_FROM
HAVING COUNT(*) > 1;
Q26
SELECT * FROM Title WHERE MOD (WORKER_REF_ID, 2) <> 0;
Q27
SELECT * FROM Title WHERE MOD (WORKER_REF_ID, 2) = 0;
Q28
CREATE TABLE TitleClone like Title;
INSERT INTO TitleClone SELECT * FROM Title;
Select * from TitleClone;
Q29
(SELECT * FROM Title) INTERSECT (SELECT * FROM TitleClone);
Q30
SELECT * FROM WORKER W WHERE NOT EXISTS (SELECT * FROM TITLE T WHERE W.WORKER_ID = T.WORKER_REF_ID);Q31
SELECT CURDATE();
SELECT NOW();
Q32
SELECT * FROM Worker ORDER BY Salary DESC LIMIT 10;
Q33
SELECT Salary FROM Worker ORDER BY Salary DESC LIMIT 4,1;
Q34
SELECT Salary
FROM Worker W1
WHERE 4 = (
 SELECT COUNT( DISTINCT ( W2.Salary ) )
 FROM Worker W2
 WHERE W2.Salary >= W1.Salary
);
Q35
Select distinct W.WORKER_ID, W.FIRST_NAME, W.Salary 
from Worker W, Worker W1 
where W.Salary = W1.Salary 
and W.WORKER_ID != W1.WORKER_ID;
Q36
Select max(Salary) from Worker 
where Salary not in (Select max(Salary) from Worker);
Q37
select FIRST_NAME, DEPARTMENT from worker W where W.DEPARTMENT='HR' 
union all 
select FIRST_NAME, DEPARTMENT from Worker W1 where W1.DEPARTMENT='HR';
Q38
(SELECT * FROM Title) EXISTS (SELECT * FROM TitleClone);
Q39
SELECT * FROM WORKER
WHERE WORKER_ID <= (SELECT count(WORKER_ID)/2 from Worker);
Q40
SELECT DEPARTMENT, COUNT(WORKER_ID) as 'Number of Workers' FROM Worker GROUP BY DEPARTMENT HAVING COUNT(WORKER_ID) < 5;
Q41
SELECT DEPARTMENT, COUNT(DEPARTMENT) as 'Number of Workers' FROM Worker GROUP BY DEPARTMENT;
Q42
SELECT * FROM WORKER WHERE WORKER_ID = (SELECT MAX(WORKER_ID) FROM WORKER);
Q43
SELECT * FROM WORKER WHERE WORKER_ID = (SELECT MIN(WORKER_ID) FROM WORKER);
Q44
(SELECT * FROM WORKER WHERE WORKER_ID <=5) UNION (SELECT * FROM (SELECT * FROM WORKER W ORDER BY W.WORKER_ID DESC) AS W1 WHERE W1.WORKER_ID <=5);
Q45
SELECT T.DEPARTMENT,T.FIRST_NAME,T.SALARY FROM(SELECT MAX(SALARY) AS TOTALSALARY,DEPARTMENT FROM WORKER GROUP BY DEPARTMENT) AS TEMPNEW INNER JOIN WORKER T ON TEMPNEW.DEPARTMENT=T.DEPARTMENT AND TEMPNEW.TOTALSALARY=T.SALARY;
Q46
SELECT DISTINCT SALARY FROM WORKER A WHERE 1 >= (SELECT COUNT(DISTINCT SALARY) FROM WORKER B WHERE A.SALARY <= B.SALARY) ORDER BY A.SALARY DESC;
Q47
SELECT DISTINCT SALARY FROM WORKER A WHERE 2 >= (SELECT COUNT(DISTINCT SALARY) FROM WORKER B WHERE A.SALARY >= B.SALARY) ORDER BY A.SALARY DESC;
Q48
SELECT DISTINCT SALARY FROM WORKER A WHERE 3 >= (SELECT COUNT(DISTINCT SALARY) FROM WORKER B WHERE A.SALARY <= B.SALARY) ORDER BY A.SALARY DESC;
Q49
SELECT DEPARTMENT, SUM(SALARY) FROM WORKER GROUP BY DEPARTMENT;
Q50
SELECT FIRST_NAME, SALARY FROM WORKER WHERE SALARY=(SELECT MAX(SALARY) FROM WORKER);