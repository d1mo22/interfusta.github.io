"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";
import { ProjectCard } from "@/components/project-admin-card";
import { useProjectDelete } from "@/app/hooks/useProjectDelete";
import { formatDate } from "@/lib/utils";
import type { ClientPortfolioProps, Project } from "../../types/types";
import { Pagination } from "@/components/ui/pagination";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 6;

export default function AdminDashboard({
	initialProjects: projects,
	categories,
}: ClientPortfolioProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const projectsRef = useRef<HTMLDivElement>(null);
	const {
		isDeleting,
		showDeleteDialog,
		projectToDelete,
		handleDeleteClick,
		handleDelete,
		setShowDeleteDialog,
	} = useProjectDelete();

	const paginateProjects = (projects: Project[], page: number) => {
		const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

		const startIndex = (page - 1) * ITEMS_PER_PAGE;
		return sortedProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	};

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		setTimeout(() => {
			projectsRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 0);
	};

	return (
		<div className="min-h-screen pt-16 bg-gray-50" ref={projectsRef}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
					<h1 className="text-3xl font-bold">Gestió de Projectes</h1>
					<div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
						<Link href="/admin/categories" className="w-full sm:w-auto">
							<Button variant="outline" className="w-full">
								<Settings className="h-4 w-4 mr-2" />
								Gestionar Categories
							</Button>
						</Link>
						<Link href="/admin/projects/new" className="w-full sm:w-auto">
							<Button className="w-full">
								<Plus className="h-4 w-4 mr-2" />
								Afegir Nou Projecte
							</Button>
						</Link>
					</div>
				</div>
				{/* Project List */}
				{projects.length === 0 ? (
					<Card>
						<CardContent className="p-6 text-center">
							<p>
								No s&apos;han trobat projectes. Comença afegint un nou projecte.
							</p>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{paginateProjects(projects, currentPage).map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								categories={categories}
								onDeleteClick={handleDeleteClick}
								isDeleting={isDeleting === project.id}
								formatDate={formatDate}
							/>
						))}
					</div>
				)}

				{/* Pagination */}
				{projects.length > ITEMS_PER_PAGE && (
					<Pagination
						currentPage={currentPage}
						totalItems={projects.length}
						itemsPerPage={ITEMS_PER_PAGE}
						onPageChange={handlePageChange}
					/>
				)}
			</div>

			{/* Delete Confirmation Dialog */}
			<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar eliminació</DialogTitle>
						<DialogDescription>
							Estàs segur que desitges eliminar el projecte &quot;
							{projectToDelete?.title}&quot;? Aquesta acció no es pot desfer.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowDeleteDialog(false)}
						>
							Cancel·lar
						</Button>
						<Button
							variant="destructive"
							onClick={handleDelete}
							disabled={isDeleting !== null}
						>
							{isDeleting !== null ? "Eliminant..." : "Eliminar"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
