import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  module ContactSubmission {
    public type InquiryType = { #booking; #general };

    public type Submission = {
      name : Text;
      email : Text;
      message : Text;
      inquiryType : InquiryType;
      timestamp : Int;
    };
  };

  module NewsletterSignup {
    public type Submission = {
      name : Text;
      email : Text;
      timestamp : Int;
    };
  };

  module ShowRequest {
    public type Request = {
      name : Text;
      email : Text;
      city : Text;
      state : Text;
      country : Text;
      message : Text;
      timestamp : Int;
    };
  };

  let contactSubmissions = List.empty<ContactSubmission.Submission>();
  let showRequests = List.empty<ShowRequest.Request>();
  let newsletterSignups = Map.empty<Text, NewsletterSignup.Submission>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (user.equal(caller)) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text, inquiryType : ContactSubmission.InquiryType) : async () {
    let submission : ContactSubmission.Submission = {
      name;
      email;
      message;
      inquiryType;
      timestamp = Time.now();
    };
    contactSubmissions.add(submission);
  };

  public shared ({ caller }) func submitShowRequest(name : Text, email : Text, city : Text, state : Text, country : Text, message : Text) : async () {
    let request : ShowRequest.Request = {
      name;
      email;
      city;
      state;
      country;
      message;
      timestamp = Time.now();
    };
    showRequests.add(request);
  };

  public shared ({ caller }) func signupNewsletter(name : Text, email : Text) : async () {
    if (newsletterSignups.containsKey(email)) {
      Runtime.trap("This email is already subscribed to the newsletter.");
    };

    let signup : NewsletterSignup.Submission = {
      name;
      email;
      timestamp = Time.now();
    };
    newsletterSignups.add(email, signup);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission.Submission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions.");
    };
    contactSubmissions.toArray();
  };

  public query ({ caller }) func getAllNewsletterSignups() : async [NewsletterSignup.Submission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view newsletter signups.");
    };
    newsletterSignups.values().toArray();
  };

  public query ({ caller }) func getAllShowRequests() : async [ShowRequest.Request] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view show requests.");
    };
    showRequests.toArray();
  };
};
