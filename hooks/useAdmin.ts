import { traduction } from "@/db/schema";
import { updatedTraduction } from "@/actions/admin";
import { Users } from "@/app/(dashboard)/data/schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetAdminTraduction } from "@/actions/getTraductions";
import { AssignTraduction } from "@/lib/mail";

export function useAdmin() {
  const queryClient = useQueryClient();

  const GetTableauQuery = useQuery<Users[]>({
    queryKey: ["getTableau"],
    queryFn: async () => {
      const data = await GetAdminTraduction();
      if ("error" in data) {
        throw new Error(data.error);
      }
      return data;
    },
  });
  const GetTraductionQuery = useQuery<Users[]>({
    queryKey: ["getTraducteur"],
    queryFn: async () => {
      const response = await fetch("/api/admin/getTraducteur");
      if (!response.ok) {
        throw new Error("Failed to fetch traducteur");
      }
      return response.json();
    },
  });

  const AssigneTraductionMutation = useMutation({
    mutationFn: async ({
      traductionId,
      userId,
    }: {
      traductionId: string;
      userId: string;
    }) => {
      const result = await updatedTraduction(traductionId, userId);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    onMutate: async ({ traductionId, userId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["getTableau"] });

      // Get the current data
      const previousData = queryClient.getQueryData<Users[]>(["getTableau"]);

      // Optimistically update the cache
      if (previousData) {
        queryClient.setQueryData<Users[]>(["getTableau"], (old) => {
          if (!old) return [];
          return old.map((semester) => {
            return semester;
          });
        });
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["getTableau"], context.previousData);
      }
      toast.error(error.message);
    },
    onSuccess: async (userId) => {
      await AssignTraduction(userId?.email!);
      toast.success("Fichier assigné");
      queryClient.invalidateQueries({ queryKey: ["getTableau"] });
    },
  });

  // const updateCourseMutation = useMutation({
  //   mutationFn: async ({
  //     courseId,
  //     courseData,
  //   }: {
  //     courseId: string;
  //     courseData: Partial<CourseFormData>;
  //   }) => {
  //     const result = await updateCourse(courseId, courseData);
  //     if (result.error) throw new Error(result.error);
  //     return result.data;
  //   },
  //   onMutate: async ({ courseId, courseData }) => {
  //     await queryClient.cancelQueries({ queryKey: ["courses"] });
  //     const previousData = queryClient.getQueryData<SemesterWithCourses[]>([
  //       "courses",
  //     ]);

  //     if (previousData) {
  //       queryClient.setQueryData<SemesterWithCourses[]>(["courses"], (old) => {
  //         if (!old) return [];
  //         return old.map((semester) => ({
  //           ...semester,
  //           courses: semester.courses.map((course) =>
  //             course.id === courseId ? { ...course, ...courseData } : course
  //           ),
  //         }));
  //       });
  //     }

  //     return { previousData };
  //   },
  //   onError: (error, variables, context) => {
  //     if (context?.previousData) {
  //       queryClient.setQueryData(["courses"], context.previousData);
  //     }
  //     toast.error(error.message);
  //   },
  //   onSuccess: () => {
  //     toast.success("Course updated successfully");
  //     queryClient.invalidateQueries({ queryKey: ["courses"] });
  //   },
  // });

  // const deleteCourseMutation = useMutation({
  //   mutationFn: async (courseId: string) => {
  //     const result = await deleteCourse(courseId);
  //     if (result.error) throw new Error(result.error);
  //     return result.data;
  //   },
  //   onMutate: async (courseId) => {
  //     await queryClient.cancelQueries({ queryKey: ["courses"] });
  //     const previousData = queryClient.getQueryData<SemesterWithCourses[]>([
  //       "courses",
  //     ]);

  //     if (previousData) {
  //       queryClient.setQueryData<SemesterWithCourses[]>(["courses"], (old) => {
  //         if (!old) return [];
  //         return old.map((semester) => ({
  //           ...semester,
  //           courses: semester.courses.filter(
  //             (course) => course.id !== courseId
  //           ),
  //         }));
  //       });
  //     }

  //     return { previousData };
  //   },
  //   onError: (error, variables, context) => {
  //     if (context?.previousData) {
  //       queryClient.setQueryData(["courses"], context.previousData);
  //     }
  //     toast.error(error.message);
  //   },
  //   onSuccess: () => {
  //     toast.success("Course deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["courses"] });
  //   },
  // });

  return {
    tableauFichier: GetTableauQuery.data ?? [],
    TableauisLoading: GetTableauQuery.isLoading,
    TableauisError: GetTableauQuery.isError,
    Tableauerror: GetTableauQuery.error,
    AllTraducteur: GetTraductionQuery.data ?? [],
    isLoading: GetTraductionQuery.isLoading,
    isError: GetTraductionQuery.isError,
    error: GetTraductionQuery.error,
    updateTraduction: AssigneTraductionMutation.mutate,
    // addCourse: addCourseMutation.mutate,
    // updateCourse: updateCourseMutation.mutate,
    // deleteCourse: deleteCourseMutation.mutate,
    // isAddingCourse: addCourseMutation.isPending,
    // isUpdatingCourse: updateCourseMutation.isPending,
    // isDeletingCourse: deleteCourseMutation.isPending,
  };
}
