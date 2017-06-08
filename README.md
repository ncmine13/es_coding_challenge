== Setup ==

Our mission is to provide the best learning experiences to students, personalized
to their unique learning pathway. One aspect of that personalization is academic level:
students should work on content that is challenging, but not out of reach. 

When a student first enters our system, we use their existing standardized test scores
as a way to bootstrap the correct level. If a student comes in below grade level, they
can work on something simpler than their classmates, whereas if they are way above 
grade level, then they can work on more challenging material.

In this exercise, you'll take students' standardized test scores, and use some heuristics
to produce a draft learning pathway for the student.

The sample files provided work with just the reading standards, although this same approach
would be used for math, social studies, or alternate standard systems. If you're curious, 
you can read more details about the reading standards here: http://www.corestandards.org/ELA-Literacy/

== Input Files ==

There are two input files:

1/ domain_order.csv -- The Common Core State Standards are grouped broadly into domains - 
for example, Reading Literature (RL) is the study of fictional text, whereas
Reading Informational Text (RI) is non-fiction. This file contains the recommended order
in which a student should work through the domains.

Each row represents the ordering for a given grade level. For example, this row:

    K,RF,RL,RI

... means that students should work first on K.RF, K.RL, then K.RI.

2/ student_tests.csv -- Each student takes a standardized test aligned to the Common Core,
and for each domain, they are given an approximate grade level. The student should work
on material at the grade level for which they tested - for example, if they received
a grade of 1 for domain RL, then they should study the RL standards at the 1st grade level.

Each row represents a single student's scores; there is one column for each domain. If the student
was tested in that domain, then the grade level that they were assessed at appears in the column.

For example, in this file:

     Student Name,RF,RL,RI
     Barbara Geary,2,2,K

Barbara tested at the 2nd grade level in Reading Foundations and Reading Literature, but she's struggling
at the Kindergarten level in Reading Informational Text.

== Expected Output ==

Your program should take the two input CSVs, and produce the learning path for each student.

* If a student has no scores, then start at the beginning (with K.RF, in the example data)
* For a given domain, students shouldn't have to repeat content that they have already
mastered. For example, if a student has tested 2.RL, then they should not do K.RL or 1.RL.
* Learning path should contain up to five units (if no content is left, then fewer units are ok)
* This should be able to work with a different set of input, including a different set of
domains that may or may not be Common Core.

== Coding ==

This is an opportunity for you to try out a real-world problem like the ones we face at eSpark.
It's also a chance to show how you'd approach and code. We are looking for clear, concise code,
that is easy to understand, easy to change, and well tested.

