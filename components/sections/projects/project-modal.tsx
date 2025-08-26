'use client';

import { memo } from 'react';
import { Project } from '@/types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = memo(function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <ModalHeader>
          <div className="flex items-start justify-between pr-8">
            <div>
              <ModalTitle className="mb-2 text-2xl">{project.title}</ModalTitle>
              <ModalDescription className="text-base">
                {project.description}
              </ModalDescription>
            </div>
            {project.featured && (
              <Badge className="ml-4 flex-shrink-0" variant="default">
                Featured
              </Badge>
            )}
          </div>
        </ModalHeader>

        <div className="mt-6 space-y-6">
          {project.links.live ? (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                {project.images?.thumbnail ? (
                  <>
                    <img
                      src={project.images.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="rounded-full bg-white/90 p-3">
                        <svg
                          className="h-6 w-6 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl opacity-30">
                      {project.techStack[0]?.icon}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
              {project.images?.thumbnail ? (
                <img
                  src={project.images.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-30">
                    {project.techStack[0]?.icon}
                  </span>
                </div>
              )}
            </div>
          )}

          {project.longDescription && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">About</h3>
              <p className="text-muted-foreground">{project.longDescription}</p>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Key Features</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Technical Challenges
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.challenges}
              </p>
            </div>
          )}

          <div>
            <h3 className="mb-3 text-lg font-semibold">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {project.techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center rounded-lg bg-secondary/50 p-4"
                >
                  <span className="mb-2 text-3xl">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.links.live && (
              <Button>
                <Link
                  href={project.links.live}
                  target="_blank"
                  className="flex items-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Live
                </Link>
              </Button>
            )}
            {project.links.github && (
              <Button variant="outline">
                <Link
                  href={project.links.github}
                  target="_blank"
                  className="flex items-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Code
                </Link>
              </Button>
            )}
            {project.links.demo && (
              <Button variant="outline">
                <Link
                  href={project.links.demo}
                  target="_blank"
                  className="flex items-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Watch Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
});
