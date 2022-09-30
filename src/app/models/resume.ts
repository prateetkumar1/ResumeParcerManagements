export class Resume {
    constructor(
        public catagory: number,
        public details: Details
    ) { }
}

export class Details {
    constructor(
        public firstName: string,
        public lastName: string,
        public emailAddress: string,
        public phoneNumbers: number,
        public skills: [],
        public projects: [],
        public socialProfiles: [],
        public educations: [],
        public workExperience: string,
        public fileLocation: string
    ) { }
}