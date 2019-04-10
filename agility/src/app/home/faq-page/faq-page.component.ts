import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/auth/navbar.service';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {

  sections: {question: string, answer: string}[] = [
    { 
      question: 'How do I log in or out?',
      answer: 'Navigate to the Login or FAQ page, this is the first page you see if you load the site.  You can click the Login button either on the login page or in the navigation bar.  When you click on it, it will take you to another window which will prompt you for the Google account you wish to sign in with.  To sign out of Agility, click the Sign Out button in the navigation bar; this action will redirect you back to the Login page.'
    },
    {
      question: 'How do I see, create, update, or delete projects?',
      answer: 'After you sign in, you will notice that the Login button on the Login page will turn into a different button that says “Your Projects” and that a new tab called “Projects” has appeared on the navigation bar.  If you click on one of these buttons, you will be directed to the Project Dashboard page.  When this page loads, you will see all of the projects you are apart of or have created.\nTo create a new project, click on the button called “Create Project.”  This will open a modal on the current page which will ask for project metadata like description and name.  Once you have filled this out, click the “Create” button and the new project will appear on your dashboard.\nTo edit a existing project, hover over the “See More” icon of the project you wish to edit and select the option to edit the project.  A similar modal to the one for creating a new project will appear on screen and prompt you for the changes to the project.  Once you have edited what you needed, click the “Update” button and the updated project will appear on your dashboard.\nTo delete a existing project, hover over the “See More” icon of the project you wish to delete and select the option to delete the project.  This will open another modal which will confirm that you wish to delete the project.  Once you have reaffirmed your intentions to delete the project, the project will be removed from your dashboard.'
    },
    {
      question: 'How do I see, create, update, or delete sprints?',
      answer: 'Once you are signed in and on the Project Dashboard page, click on any project card to see that specific project’s dashboard.  If this is a newly created project, you will not see any sprints or tasks on this page, it will be entirely blank and prompt you to make a sprint.  Note: only Project Leads can make sprints.  If this is an existing project then you will see all of the sprints and tasks in the project.\nTo create a new sprint, click the “Create Sprint” button on the project details dashboard.  This will open a modal that will prompt you for the information regarding the sprint such as description.  Once you have filled this out, click the “Create” button and you will see the new sprint appear on your dashboard.\nTo edit an existing sprint, hover over the “See More” icon and click the option saying “Edit.”  This will open a similar modal to the creation of a sprint and prompt you for the changes.  Click “Update” to finish updating and see the changes made to the sprint.\nTo delete a sprint, hover over the same icon and click the option saying “Delete.”  This will open a confirmation modal which will affirm your intent to delete the sprint.  After you affirm, you will no longer see the sprint on your project details dashboard.'
    },
    {
      question: 'How do I see, create, update, or delete tasks?',
      answer: 'Once you are signed in, on the project details dashboard, and clicked a sprint card, you will see all of the tasks related to that sprint.  If this is a new sprint, you will see no tasks and the page will prompt you to make a task.  Note: anyone can make a task in a project.\nTo create a new task, click the “Create Task” button on the project details dashboard.  This will open a modal that will prompt you for the information regarding the task such as due date.  Once you have filled this out, click the “Create” button and you will see the new sprint appear on your dashboard.\nTo edit an existing task, first navigate to the Task Details page by clicking on the task.  On this page there is button to “Edit” the task, click it and it will bring you to a similar modal as the one for creating a task.  It will prompt you for changes and update the task accordingly.\nTo delete an existing task, navigate to the Task Details page by clicking on the task.  On this page there is a button to “Delete” the task, click it and it will bring up a confirmation modal.  Click the “Delete” button and you will be navigated back to the project details dashboard and the task will be gone.'
    },
    {
      question: 'How do I see, create, update, or delete notes and blocks?',
      answer: 'When you navigate to the Task Details page you will notice that there is a section for notes and for blocks.  These sections will be empty if there are no notes or blocks on a given task and the user will be prompted to make one.  Note: anyone can make a block or note on a given task.\nTo create a note or block, click the corresponding “Create” button.  This will open a simple modal that only takes text input.  Click the “Create” button after filling this out and the note or block will be displayed on the Task Details page.\nTo edit a note or block, click the corresponding “Edit” button.  This will open a simple modal that only tasks text input.  Click the “Update” button after filling this out and the note or block will be displayed and updated on the Task Details page.\nTo delete a note or block, click the corresponding “Delete” button for a given note or block.  This will open a confirmation modal which prompts the user if they wish to delete the note or block.  Click the “Delete” button and the Task Details page will be updated accordingly.'
    },
    {
      question: 'How do I add, remove, or update team members in a project?',
      answer: 'When you navigate to the Project Details Dashboard, you will notice that there is a settings icon that appears on the screen.  If you click this, it brings you to the Project Settings Page.  From here, there is an option to add, remove, or update privilege of team members for the specific project.  This will bring you to a list of members, the Project Team Page.\nIf you wish to add a user to a project, input their email address in the input bar and click the “Add” button.  The new team member will appear on your screen if they exist, if they don’t the system will notify you accordingly.\nIf you wish to edit the privileges of a specific use, click on their user card and select the level of privilege you wish to give them.  Note: only project leads can edit privilege.\nIf you wish to remove the user from the project, click the user card again and select the remove button.  This will prompt a modal that will affirm whether or not you wish to remove the user from the project.  If you click yes, the user will be removed from the project and the Project Team Page updated accordingly.'
    }
  ]

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.isInDetailsDash = false;
  }

}
